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
  };
});

router.post("/publication", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const { description } = req.body;
    const user_id = 1;
    let urlLocal = null;

    if (req.file) {
      const { key,  location: url} = req.file;
      if (!url) {
        urlLocal = `${process.env.APP_URL}/files/${key}`;
      } else {
        urlLocal = url;
      }
    }

    const responsePublication = await publicationService.create(description, urlLocal, user_id);

    res.status(responsePublication.statusCode)
      .json({ response: responsePublication.response });
  } catch (error) {
    res.status(500)
      .json({ error: "Error saving publication", message: error.message });
  };
});

router.put("/publication/:id", multer(multerConfig).single("file"), async (req, res) => {
  
});

router.delete("/publication/:id", async (req, res) => {
  try {
    const responseDeletePublication = await publicationService.delete(req.params.id);

    res.status(responseDeletePublication.statusCode).json({response: responseDeletePublication.response});
  } catch (error) {
    res.status(500)
      .json({ error: "Error saving publication", message: error.message });
  };
});


module.exports = router;
