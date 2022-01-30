const File = require("../models/file_modal");
const fs = require("fs");
const connectDB = require("../config/db");
const express = require("express");
const router = express.Router();

async function fetchData() {
  connectDB();
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  const total_files = files.length;
  var files_deleted = 0;
  var deletion_failed = 0;
  if (files.length) {
    for (const i in files) {
      try {
        fs.unlinkSync(`${__dirname}/../${files[i].path}`);
        await files[i].remove();
        files_deleted = files_deleted + 1;
        console.log(`Successfully deleted ${files[i].filename}`);
      } catch (err) {
        deletion_failed = deletion_failed + 1;
        console.log(`Error while deleting ${files[i].filename}`);
      }
    }
    console.log("Job done!");
  }
  return [total_files, files_deleted, deletion_failed];
}

router.get("/", (req, res) => {
  fetchData().then((arr) => {
    console.log(arr);
    res.send({
      success: true,
      total_file: arr[0],
      files_deleted: arr[1],
      deletion_failed: arr[2],
    });
  });
});

module.exports = router;
