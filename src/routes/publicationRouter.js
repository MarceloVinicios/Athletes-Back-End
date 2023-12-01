const express = require("express");
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");
const checkJwt = require("../middleware/authToken");
const getTokenData = require("../utils/getTokenData");

const publicationService = require("../services/publicationService");

router.get("/publication", checkJwt, async (req, res) => {
  try {
    const responseGetAllPublication = await publicationService.getAll();

    res.status(responseGetAllPublication.statusCode)
      .json({ publicationData: responseGetAllPublication.response });
  } catch (error) {
    res.status(500)
      .json({ error: "Error retrieving publications", message: error.message });
  };
});

router.get("/publication/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const responseGetPublication = await publicationService.getPublication(id);

    res.status(responseGetPublication.statusCode)
     .json({ publicationData: responseGetPublication.response });
  } catch (err) {
    res.status(500)
     .json({ error: "Error retrieving a publication", message: err.message });
  };
});

router.get("/publication/category/:category", checkJwt, async (req, res) => {
  try {
    const {category} = req.params;
    const responseGetAllPublicationsByCategory = await publicationService.getByCategory(category);

    res.status(responseGetAllPublicationsByCategory.statusCode)
      .json({ publicationData: responseGetAllPublicationsByCategory.response });
  } catch (error) {
    res.status(500).json({error: "Error getting publication by category", message: error.message});
  };
});

router.post("/publication", checkJwt, multer(multerConfig).single("file"), async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const { description, category } = req.body;
    console.log(category);

    let urlLocal = null;
    let keyFile = null;

    if (req.file) {
      const { key, location: url } = req.file;
      keyFile = key
      if (!url) {
        urlLocal = `${process.env.APP_URL}/files/${key}`;
      } else {
        urlLocal = url;
      }
    }

    const responsePublication = await publicationService.create(description, urlLocal, keyFile, userData.sub, category);

    res.status(responsePublication.statusCode)
      .json({ response: responsePublication.response });
  } catch (error) {
    res.status(500)
      .json({ error: "Error saving publication", message: error.message });
  }
});

router.put("/publication/:id?", multer(multerConfig).single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { description, user_id} = req.body;

    if (req.file) {
      const { key,  location: url } = req.file;
      if (!url) {
        urlLocal = `${process.env.APP_URL}/files/${key}`;
      } else {
        urlLocal = url;
      };
    };

    const responseUpdatePublication = await publicationService.update(id, description, urlLocal, user_id);

    res.status(responseUpdatePublication.statusCode)
    .json({ response: responseUpdatePublication.response });
  } catch (error) {
    res.status(500)
    .json({ error: "Error update publication", message: error.message });
  };
});

router.delete("/publication/:id?", checkJwt, async (req, res) => {
  try {
    const {id} = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseDeletePublication = await publicationService.delete(id, userData.sub);

    res.status(responseDeletePublication.statusCode).json({response: responseDeletePublication.response});
  } catch (error) {
    res.status(500)
      .json({ error: "Error delete publication", message: error.message });
  };
});

module.exports = router;
