const express = require("express");
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const publicationService = require("../services/publicationService");
const userService = require("../services/userService");

const publicationModel = require("../models/PublicationModel")

router.post("/publication", multer(multerConfig).single('file'), async (req, res) => {
  const {originalname: name, size, key, url = ''} = req.file

  try {
    const responseModel = await publicationModel.create(
      name,
      size,
      key,
      url
    )

    res.json({hello: 'Luiz'});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error saving publication", message: error.message });
  }
});

module.exports = router;
