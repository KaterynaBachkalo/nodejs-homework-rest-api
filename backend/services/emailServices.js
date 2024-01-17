const sgMail = require("@sendgrid/mail");
const serverConfig = require("../configs/serverConfig");
require("dotenv").config();

sgMail.setApiKey(serverConfig.sendgridApiKey);

exports.sendEmail = async (data) => {
  const email = { ...data, from: serverConfig.emailSender };
  await sgMail.send(email);
  return true;
};
