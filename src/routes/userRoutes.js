const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const checkJwt = require("../middleware/authToken");
const getTokenData = require("../utils/getTokenData");
const multer = require("multer");
const multerConfig = require("../config/multer");

router.get("/user", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);
    const getOneUser = await userService.getUser(userData.sub);

    res
      .status(getOneUser.statusCode)
      .json({ response: getOneUser.response[0] });
  } catch (error) {
    res.status(500).json({ msg: " failed to get user" });
  }
});

router.post("/user", checkJwt, multer(multerConfig).single("picture"), async (req, res) => {
    try {
      const { name, goal, category_id, city, state, country } = req.body;
      const token = req.headers.authorization.split(" ")[1];
      const userData = await getTokenData(token);
      let urlLocal = null;
      let keyFile = null;

      console.log(req.file)
      console.log(name, goal, category_id, city, state, country)
      if (req.file) {
        const { key, location: url } = req.file;
        keyFile = key;
        if (!url) {
          urlLocal = `${process.env.APP_URL}/files/${key}`;
        } else {
          urlLocal = url;
        }
      }

      const createUser = await userService.createUser(
        userData.sub,
        userData.email,
        name,
        urlLocal,
        goal,
        category_id,
        city,
        state,
        country
      );

      res.status(createUser.statusCode).json(createUser.response);
    } catch (err) {
      res.status(500).json({ msg: "Error creating user" });
    }
  }
);

router.put("/user", checkJwt, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const { sub } = req.user;
    const upatedeUser = await userService.updateUser(sub, name, picture);

    res.status(upatedeUser.statusCode).json(upatedeUser.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error update publication", message: error.message });
  }
});

router.delete("/user/:id?", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteId = await userService.deleteUser(id, name, picture);
    res.status(deleteId.statusCode).json(deleteId.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error update publication", message: error.message });
  }
});

module.exports = router;
