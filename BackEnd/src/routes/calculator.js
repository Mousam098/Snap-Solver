const express = require("express");
const router = express.Router();
const {
  analyzeImage,
  analyzeImageWithSteps,
} = require("../utils/imageAnalyzer");
const ImageData = require("../models/ImageData");

router.post("", async (req, res) => {
  try {
    const { image, dict_of_vars } = req.body;

    // Extract userId from the protected route (set by auth middleware)
    const userId = req.user._id;

    const imageBuffer = Buffer.from(image.split(",")[1], "base64");

    // Run both analyses in parallel for speed
    const [responses, structured] = await Promise.all([
      analyzeImage(imageBuffer, dict_of_vars),
      analyzeImageWithSteps(imageBuffer, dict_of_vars),
    ]);

    // 💾 Save to history
    await ImageData.create({
      userId,
      expression: structured.expression,
      answer: structured.answer,
      steps: structured.steps,
      imageData: image,
    });

    res.json({
      message: "Image processed",
      data: responses,
      status: "success",
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({
      message: "Error processing image",
      error: error.message,
      status: "error",
    });
  }
});

module.exports = router;
