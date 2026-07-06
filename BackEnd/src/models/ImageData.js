// class ImageData {
//     constructor(image, dict_of_vars) {
//       this.image = image;
//       this.dict_of_vars = dict_of_vars;
//     }
//   }

//   module.exports = ImageData;

const mongoose = require("mongoose");

const imageDataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expression: { type: String },
  answer: { type: String },
  steps: [
    {
      step: Number,
      description: String,
      result: String,
    },
  ],
  imageData: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ImageData", imageDataSchema);
