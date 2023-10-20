const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const checkJwt = require("../middleware/authToken");
const getTokenData = require("../utils/getTokenData");

router.get("/user/:id?", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const getOneUser = await userService.getUser(id);

    res.status(getOneUser.statusCode).json(getOneUser.response);
  } catch (error) {
    res.status(500).json({ msg: " failed to get user" });
  }
});

router.post("/user", checkJwt, async (req, res) => {
  try {
    const { user, address } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const createUser = await userService.createUser(
      userData.sub,
      userData.email,
      user.name,
      user.picture,
      user.goal,
      user.category_id,
      address.city,
      address.state,
      address.country
    );

    res.status(createUser.statusCode).json(createUser.response);
  } catch (err) {
    res.status(500).json({ msg: "Error creating user" });
  }
});

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
