const serverConfig = {
  mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017",
  PORT: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET ?? "secret-phrase",
  jwtExpires: process.env.JWT_EXPIRES ?? "20h",
  sendgridApiKey: process.env.SENDGRID_API_KEY ?? "sendgrid-Api-Key",
  emailSender: process.env.EMAIL_SENDER ?? "user@gmail.com",
  baseURL: process.env.BASE_URL ?? "http://localhost:3000",
};

module.exports = serverConfig;
