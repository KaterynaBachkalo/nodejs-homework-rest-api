const { User } = require("../models");
const { userServices, jwtServices, upload } = require("../services");
const { catchAsync, validSchemas, HttpError } = require("../utils");

exports.checkRegistrationData = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.addUserSchema.validate(req.body);

  if (error) throw new HttpError(400, error.message);

  await userServices.checkUserEmailExists({ email: value.email });

  req.body = value;

  next();
});

exports.checkLoginData = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.addUserSchema.validate(req.body);

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

exports.checkSubscriptionExist = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.updateSubSchema.validate(req.body);

  if (error) throw new HttpError(400, "Subscription name is not exist");

  req.body = value;

  next();
});

exports.uploadAvatar = upload.single("avatar");
