const router = require("express").Router();
const nodemailer = require("nodemailer");

router.post("/", (req, res) => {
  const comment = req.body.comment;
  const file = req.body.file;

  console.log(comment);
  if (file) {
    console.log("file is here");
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sockhub.contact@gmail.com",
      pass: "csgmzwokacgasnyb",
    },
  });
  const mailOptions = {
    from: "sockhub.contact@gmail.com",
    to: "tristan.obszynski@gmail.com",
    subject: "Report",
    text: comment + file,
    html: "<h1>" + comment + "</h1>",
    attachments: [
      {
        filename: "file.zip",
        content: file.split("base64,")[1],
        encoding: "base64",
      },
    ],
  };

  let info = transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  console.log("Message sent: %s", info);
  res.send(JSON.stringify(true))
});

module.exports = router;
