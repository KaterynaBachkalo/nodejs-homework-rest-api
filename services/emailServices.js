const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, EMAIL_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_SENDER };
  await sgMail.send(email);
  return true;
};
