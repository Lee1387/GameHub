import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { AUTH_CONSTANTS } from "../config/constants.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: AUTH_CONSTANTS.MIN_USERNAME_LENGTH,
      maxlength: AUTH_CONSTANTS.MAX_USERNAME_LENGTH,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: AUTH_CONSTANTS.MIN_PASSWORD_LENGTH,
    },
    passwordHistory: [
      {
        password: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  if (!this.isNew) {
    const currentUser = await this.constructor
      .findById(this._id)
      .select("password");
    if (currentUser && currentUser.password) {
      this.passwordHistory.unshift({
        password: currentUser.password,
        createdAt: new Date(),
      });

      if (this.passwordHistory.length > AUTH_CONSTANTS.PASSWORD_HISTORY_LIMIT) {
        this.passwordHistory = this.passwordHistory.slice(
          0,
          AUTH_CONSTANTS.PASSWORD_HISTORY_LIMIT
        );
      }
    }
  }

  this.password = await bcrypt.hash(
    this.password,
    AUTH_CONSTANTS.BCRYPT_SALT_ROUNDS
  );

  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.isPasswordReused = async function (candidatePassword) {
  const isSameAsCurrent = await this.comparePassword(candidatePassword);
  if (isSameAsCurrent) return true;

  for (const historicalPassword of this.passwordHistory) {
    const isMatch = await bcrypt.compare(
      candidatePassword,
      historicalPassword.password
    );
    if (isMatch) return true;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires =
    Date.now() + AUTH_CONSTANTS.RESET_TOKEN_EXPIRES_IN;
  return resetToken;
};

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordHistory;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  return userObject;
};

export default mongoose.model("User", userSchema);
