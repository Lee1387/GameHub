import { Gamepad2 } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-4 group">
      <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 animate-glow">
        <Gamepad2
          className="text-white group-hover:scale-110 transition-transform duration-300"
          size={28}
        />
      </div>
      <span className="text-3xl font-display font-bold text-gradient">
        GameHub
      </span>
    </div>
  );
}

export default Logo;
