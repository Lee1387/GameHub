import { v4 as uuidv4 } from "uuid";

export const requestLogger = (req, res, next) => {
  req.id = uuidv4();
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = {
      id: req.id,
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    if (res.statusCode >= 400) {
      console.error("❌", JSON.stringify(log));
    } else {
      console.log("✅", JSON.stringify(log));
    }
  });

  next();
};
