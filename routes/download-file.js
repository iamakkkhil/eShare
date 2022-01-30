const express = require("express");
const router = express.Router();
const File = require("../models/file_modal");
const path = require("path");
const { route } = require("./files");

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });
  if (!file) {
    return res.render("download", { error: "Link has been expired" });
  }

  const filePath = `${__dirname}/../${file.path}`;
  res.download(filePath);
});

module.exports = router;
