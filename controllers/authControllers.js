const { User } = require("../models");
const { userServices } = require("../services");
const { catchAsync } = require("../utils");

exports.registration = catchAsync(async (req, res) => {
  const { user } = await userServices.registration(req.body);

  res
    .status(201)
    .json({ user: { email: user.email, subscription: user.subscription } });
});

exports.login = catchAsync(async (req, res) => {
  const { user, token } = await userServices.login(req.body);

  res.status(200).json({ user, token });
});

exports.logout = catchAsync(async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
});

exports.getCurrentUser = catchAsync(async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    user: { email, subscription },
  });
});

exports.updateSubscription = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  res.status(200).json({
    user: { email: user.email, subscription: user.subscription },
  });
});
