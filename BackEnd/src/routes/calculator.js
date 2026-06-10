const express = require("express");
const router = express.Router();
const {
  analyzeImage,
  analyzeImageWithSteps,
  analyzeTextProblem,
} = require("../utils/imageAnalyzer");
const ImageData = require("../models/ImageData");

// Existing image route
router.post("", async (req, res) => {
  try {
    const { image, dict_of_vars } = req.body;
    const userId = req.user._id;
    const imageBuffer = Buffer.from(image.split(",")[1], "base64");

    const [responses, structured] = await Promise.all([
      analyzeImage(imageBuffer, dict_of_vars),
      analyzeImageWithSteps(imageBuffer, dict_of_vars),
    ]);

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

// New text/voice input route
router.post("/analyze-text", async (req, res) => {
  try {
    const { problem, dict_of_vars = {} } = req.body;
    const userId = req.user._id;

    const parsed = await analyzeTextProblem(problem, dict_of_vars);

    // Save to history
    await ImageData.create({
      userId,
      expression: parsed.expression,
      answer: parsed.answer,
      steps: parsed.steps,
    });

    res.json({
      message: "Problem solved",
      data: parsed,
      status: "success",
    });
  } catch (error) {
    console.error("Error processing text:", error);
    res.status(500).json({
      message: "Error processing problem",
      error: error.message,
      status: "error",
    });
  }
});

module.exports = router;
