const fs = require("fs/promises");
const path = require("path");
const { User } = require("../models");
const { userServices } = require("../services");
const { catchAsync } = require("../utils");
const Jimp = require("jimp");

exports.registration = catchAsync(async (req, res) => {
  const { user } = await userServices.registration(req.body);

  res.status(201).json({
    user: { email: user.email, subscription: user.subscription },
  });
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

  res.status(200).json({ email, subscription });
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

const avatarDir = path.join(__dirname, "../", "public", "avatars");

exports.updateAvatar = catchAsync(async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const image = await Jimp.read(tempUpload);
  image.resize(250, 250).writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
});
