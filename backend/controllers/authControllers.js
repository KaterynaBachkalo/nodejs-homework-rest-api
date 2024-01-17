const fs = require("fs/promises");
const path = require("path");
const { User } = require("../models");
const { userServices, emailServices } = require("../services");
const { catchAsync, HttpError } = require("../utils");
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { serverConfig } = require("../configs");

exports.registration = catchAsync(async (req, res) => {
  const verificationToken = nanoid();
  const { user } = await userServices.registration(req.body, verificationToken);

  const verifyEmail = {
    to: user.email,
    subject: "Verify email",
    html: `<a target="_black" href="${serverConfig.baseURL}/api/users/verify/${verificationToken}">Click verify</a>`,
  };

  await emailServices.sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});

exports.verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
});

exports.resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: user.email,
    subject: "Verify email",
    html: `<a target="_black" href="${serverConfig.baseURL}/api/users/verify/${user.verificationToken}">Click verify</a>`,
  };

  await emailServices.sendEmail(verifyEmail);

  res.status(200).json({ message: "Verification email sent" });
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

  if (!req.file) {
    throw new HttpError(400, "Please, upload the image");
  }

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarDir, filename);

  const avatar = await Jimp.read(tempUpload);
  avatar
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);

  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({
    avatarURL,
  });
});
