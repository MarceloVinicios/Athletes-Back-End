const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/authToken");
const likeService = require("../services/likeService");
const getTokenData = require("../utils/getTokenData");

router.post("/like/:publication_id?", checkJwt, async (req, res) => {
  try {
    const { publication_id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseLike = await likeService.addLikeToPublication(userData.sub, publication_id);

    res.status(responseLike.statusCode).json({
      response: responseLike.response
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error like", message: error.message });
  };
});

module.exports = router;
