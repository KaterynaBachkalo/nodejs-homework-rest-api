const jwt = require("jsonwebtoken");
const { serverConfig } = require("../configs");
const { HttpError } = require("../utils");

exports.checkToken = (token) => {
  if (!token) throw new HttpError(401, "Not authorized");

  try {
    const { id } = jwt.verify(token, serverConfig.jwtSecret);

    return id;
  } catch (err) {
    throw new HttpError(401, "Not authorized");
  }
};
