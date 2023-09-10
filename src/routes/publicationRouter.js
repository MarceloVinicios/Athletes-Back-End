const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const publicationService = require("../services/publicationService");
const userService = require("../services/userService");

router.post("/publication", multer(multerConfig).single('file'), async (req, res) => {
  try {
    const {location: url = `${process.env.APP_URL}/files/${key}`, user_id} = req.file;
    const {description} = req.body;
    const responsePublication = await publicationService.create(description, url, user_id);

    res.json({hello: 'Luiz'});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving publication", message: error.message });
  }
});

module.exports = router;
