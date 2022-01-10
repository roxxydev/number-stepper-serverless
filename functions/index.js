const functions = require("firebase-functions");

const firebaseConfig = functions.config();
const mailgunApiKey = firebaseConfig.numberservice.mailgun_api_key;
const mailgunDomain = firebaseConfig.numberservice.mailgun_domain;
const mailgunRecipient = firebaseConfig.numberservice.mailgun_recipient;

const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: mailgunApiKey,
});

const sendEmailNotification = (number) => {
  mg.messages.create(mailgunDomain, {
    from: "Number Stepper <numberstepper@bot.mailgun.org>",
    to: [mailgunRecipient],
    subject: "Hello from Cloud Functions",
    text: `Testing Cloud Functions and Firestore. Number value is ${number}.`,
    html: "<h1>Used Mailgun for email notification.</h1>",
  }).catch((e) => {
    functions.logger.error("Error sending email notification", e);
  });
};

exports.notifyOnChanges = functions.firestore.document("/Number/{documentId}")
    .onUpdate((change, context) => {
      const after = change.after.data();

      if (after.value % 10 === 0) {
        // Only send email if the number value is a multiple of 10
        functions.logger.log("Notifying", context.params.documentId, after);
        sendEmailNotification(after.value);
        functions.logger.info("Email sent", context.params.documentId, after);
      }

      return after;
    });
