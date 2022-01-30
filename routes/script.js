const File = require("../models/file_modal");
const fs = require("fs");
const connectDB = require("../config/db");
const express = require("express");
const router = express.Router();

async function fetchData() {
  connectDB();
  const pastDate = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  const total_files = files.length;
  var files_deleted = 0;
  var deletion_failed = 0;
  if (files.length) {
    for (const file in files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        files_deleted = files_deleted + 1;
        console.log(`Successfully deleted ${file.filename}`);
      } catch (err) {
        deletion_failed = deletion_failed + 1;
        console.log(`Error while deleting ${file.filename}`);
      }
    }
    console.log("Job done!");
  }
  console.log(total_files, files_deleted, deletion_failed);
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
