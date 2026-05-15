const express = require("express");
const router = express.Router();
const ImageData = require("../models/ImageData");

// GET /history — last 20 solved problems for this user
router.get("/", async (req, res) => {
  try {
    const history = await ImageData.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20)
      .select("expression answer steps createdAt");

    res.json({
      status: "success",
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE /history/:id — delete one history item
router.delete("/:id", async (req, res) => {
  try {
    await ImageData.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id, // ensures users can only delete their own
    });

    res.json({
      status: "success",
      message: "History item deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = router;
