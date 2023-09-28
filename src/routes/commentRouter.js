const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");

router.get("/comment", async (req, res) => {
  try {
    const comments = await commentService.getAllComment();

    res.status(comments.statusCode).json(comments.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error retrieving comments", message: error.message });
  }
});

router.post("/comment", async (req, res) => {
  try {
    const user_id = "google-oauth2|107984660234185771402"
    const {comment} = req.body;
    const newComment = await commentService.createComment(user_id, comment);

    res.status(newComment.statusCode).json(newComment.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error create comment", message: error.message });
  }
});

router.put("/comment/:id?", async (req, res) => {
  try {
    const {id} = req.params;
    const {comment} = req.body;
    const updatedComment = await commentService.updateComment(id, comment)

    res.status(updatedComment.statusCode).json({response: updatedComment.response});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error delete comment", message: error.message });
  }
});

router.delete("/comment/:id?", async (req, res) => {
  try {
    const {id} = req.params;
    const deletedComment = await commentService.deleteUserComment(id);

    res.status(deletedComment.statusCode).json({response: deletedComment.response});
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error delete comment", message: error.message });
  }
});

module.exports = router;
