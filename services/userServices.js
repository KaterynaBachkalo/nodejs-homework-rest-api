const { serverConfig } = require("../configs");
const { User } = require("../models");
const { HttpError } = require("../utils");
const jwt = require("jsonwebtoken");

exports.checkUserEmailExists = async (email) => {
  const emailExists = await User.exists(email);

  if (emailExists) throw new HttpError(409, "Email in use");
};

exports.registration = async (data) => {
  const newUserData = {
    ...data,
    subscription: "starter",
  };

  const newUser = await User.create(newUserData);

  newUser.password = undefined;

  return {
    user: newUser,
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new HttpError(401, "Email or password is wrong");

  const passwdIsValid = await user.checkPassword(password, user.password);

  if (!passwdIsValid) throw new HttpError(401, "Email or password is wrong");

  user.password = undefined;

  const token = jwt.sign({ id: user.id }, serverConfig.jwtSecret, {
    expiresIn: serverConfig.jwtExpires,
  });

  await User.findByIdAndUpdate(user.id, { token });

  return {
    user: { email: user.email, subscription: user.subscription },
    token,
  };
};
