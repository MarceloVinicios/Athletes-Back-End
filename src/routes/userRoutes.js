const express = require("express");
const router = express.Router();

let userService = require("../services/userService");

router.get("/", async (req, res) => {
  try {
    const userResponse = await userService.create();
    res
      .status(userResponse.statusCode)
      .json({ response: userResponse.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "failed to create user", message: error.message });
  }
});

module.exports = router;
