const File = require("./models/file_modal");
const fs = require("fs");
const connectDB = require("./config/db");

connectDB();

async function fetchData() {
  const pastDate = new Date(Date.now() - 1 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  if (files.length) {
    console.log(files);
    for (const file in files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`Successfully deleted ${file.filename}`);
      } catch (err) {
        console.log(`Error while deleting ${file.filename}`);
      }
    }
    console.log("Job done!");
  }
  console.log("No files to delete!");
}

fetchData().then(process.exit);
