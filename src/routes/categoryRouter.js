const express = require("express");
const router = express.Router();
const categoryService = require("../services/categoryService");
const checkJwt = require("../middleware/authToken");

router.get("/categories", checkJwt, async (req, res) => {
  try {
    const categories = await categoryService.getAllCategory();

    res.status(categories.statusCode).json({ categoriesData: categories.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving comments", message: error.message });
  }
});

module.exports = router;
