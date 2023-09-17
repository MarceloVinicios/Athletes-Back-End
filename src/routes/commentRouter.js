const express = require("express");
const router = express.Router();

router.post("/comment", async (req, res) => {
});

router.delete("/comment/:id", async (req, res) => {
  try {
    const responseDeletePublication = await commentService.delete(req.params.id);

    res.status(responseDeletePublication.status)
      .json({response: responseDeletePublication.response})

  } catch (error) {
      res.status(500)
        .json({ error: "Error delete publication", message: error.message })
  }
})

module.exports = router;
