const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating a schema for our database
const fileSchema = new Schema(
  {
    filename: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String, required: false },
    receiver: { type: String, required: false },
  },
  { timestamps: true }
);

// creating a model and exporting it
// with name = File and passing Schema = fileSchema
module.exports = mongoose.model("File", fileSchema);
