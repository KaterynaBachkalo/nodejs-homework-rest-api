const { User } = require("../models");
const { userServices, jwtServices } = require("../services");
const { catchAsync, userValidSchema, HttpError } = require("../utils");

exports.checkRegistrationData = catchAsync(async (req, res, next) => {
  const { value, error } = userValidSchema.validate(req.body);

  if (error) throw new HttpError(400, error.message);

  await userServices.checkUserEmailExists({ email: value.email });

  req.body = value;

  next();
});

exports.checkLoginData = catchAsync(async (req, res, next) => {
  const { value, error } = userValidSchema.validate(req.body);

  if (error) throw new HttpError(400, error.message);

  req.body = value;

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer ") &&
    req.headers.authorization.split(" ")[1];

  const userId = jwtServices.checkToken(token);

  if (!userId) throw new HttpError(401, "Not authorized");

  const currentUser = await User.findById(userId);

  if (!currentUser || !currentUser.token)
    throw new HttpError(401, "Not authorized");

  req.user = currentUser;

  next();
});
