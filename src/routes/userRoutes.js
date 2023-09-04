const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const checkJwt = require("../middleware/authToken");

router.get("/user/token", checkJwt, async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const responseCreate = await userService.acessToken(accessToken);
    req.user = responseCreate.data;
    console.log(req.user)

    res.status(200).json({msg: 'Acess token successfully'});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting token", message: error.message });
  }
});

module.exports = router;
