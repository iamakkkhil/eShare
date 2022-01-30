const express = require("express");
const router = express.Router();
const path = require("path");
// to handle multipart/application data
// in our case to handle the file we are uploading using form
const multer = require("multer");
// Database model
const File = require("../models/file_modal");
// uuid
const { v4: uuid4 } = require("uuid");
// const exp = require("constants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${file.originalname}-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    console.log(req.body, req.file);
    if (!req.file) {
      return res.status(400).send({ error: "File to be uploaded is missing!" });
    }
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });
});

router.post("/send", async (req, res) => {
  const { uuid, emailTo, emailFrom } = req.body;

  // Validate request
  if (!uuid || !emailFrom || !emailTo) {
    res.status(422).send({ error: "All field are required!" });
  }

  //   Get
  const file = await File.findOne({ uuid: uuid });

  if (!file) {
    return res.render("download", { error: "Link has been expired" });
  }

  file.sender = emailFrom;
  file.receiver = emailTo;
  const response = await file.save();

  // Send email
  const sendMail = require("../services/emailServices");
  sendMail({
    from: emailFrom,
    to: emailTo,
    subject: `eShare | ${emailFrom} shared a file with you`,
    text: `${emailFrom} shared a file with you`,
    html: require("../services/emailTemplate")({
      emailFrom: emailFrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 hours",
      BASE_URL: process.env.APP_BASE_URL,
    }),
  });

  res.send({ success: true, message: "Mail sent successfully" });
});

module.exports = router;
