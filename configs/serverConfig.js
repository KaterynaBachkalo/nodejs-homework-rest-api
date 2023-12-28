const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017",
  PORT: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET ?? "secret-phrase",
  jwtExpires: process.env.JWT_EXPIRES ?? "20h",
};

module.exports = serverConfig;
