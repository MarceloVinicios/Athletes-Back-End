const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");
const checkJwt = require("../middleware/authToken");
const getTokenData = require("../utils/getTokenData");

router.get("/comment/:publication_id?", checkJwt, async (req, res) => {
  try {
    const { publication_id } = req.params;
    const comments = await commentService.getAllComment(publication_id);

    res.status(comments.statusCode).json({ commentsData: comments.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving comments", message: error.message });
  }
});

router.post("/comment", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const { comment, publication_id } = req.body;
    console.log(comment, publication_id);
    const newComment = await commentService.createComment(comment, publication_id, userData.sub);

    res.status(newComment.statusCode).json(newComment.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error create comment", message: error.message });
  }
});

router.put("/comment/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const updatedComment = await commentService.updateComment(id, comment);

    res
      .status(updatedComment.statusCode)
      .json({ response: updatedComment.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error delete comment", message: error.message });
  }
});

router.delete("/comment/:id?", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.deleteUserComment(id);

    res
      .status(deletedComment.statusCode)
      .json({ response: deletedComment.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error delete comment", message: error.message });
  }
});

router.delete("/comment/:id", async (req, res) => {
  try {
    const responseDeletePublication = await commentService.delete(
      req.params.id
    );

    res
      .status(responseDeletePublication.status)
      .json({ response: responseDeletePublication.response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error delete publication", message: error.message });
  }
});

module.exports = router;
