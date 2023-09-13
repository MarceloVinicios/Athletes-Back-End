const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const publicationService = require("../services/publicationService");

router.get("/publication", async (req, res) => {
  try {
    const responseGetAllPublication = await publicationService.getAll();
    
    res.status(responseGetAllPublication.statusCode)
      .json({ publicationData: responseGetAllPublication.response });
  } catch (error) {
    res.status(500)
      .json({ error: "Error retrieving publications", message: error.message });
  }
})

router.post("/publication", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const { description } = req.body;
    const user_id = 1;
    let url = null;

    if (req.file) {
      const { key } = req.file;
      url = `${process.env.APP_URL}/files/${key}`;
    }

    const responsePublication = await publicationService.create(description, url, user_id);

    res.status(responsePublication.statusCode)
      .json({ response: responsePublication.response });
  } catch (error) {
    res.status(500)
      .json({ error: "Error saving publication", message: error.message });
  }
});


module.exports = router;
