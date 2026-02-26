const express = require('express');
const router = express.Router();
const { analyzeImage } = require('../utils/imageAnalyzer');
const ImageData = require('../models/ImageData');

router.post('', async (req, res) => {
  try {
    const { image, dict_of_vars } = req.body;
    const imageData = new ImageData(image, dict_of_vars);
    
    const imageBuffer = Buffer.from(image.split(',')[1], 'base64');
    const responses = await analyzeImage(imageBuffer, dict_of_vars);
    
    res.json({
      message: "Image processed",
      data: responses,
      status: "success"
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({
      message: "Error processing image",
      error: error.message,
      status: "error"
    });
  }
});

module.exports = router;