const express = require("express");
const router = express.Router();
const checkJwt = require("../middleware/authToken");
const connectionService = require("../services/connectionService");
const getTokenData = require("../utils/getTokenData");

router.get("/connections/users", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseGetMyConnections = await connectionService.getAllUserForConnect(userData.sub);

    res.status(responseGetMyConnections.statusCode).json({ response: responseGetMyConnections.response });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.get("/connections", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseGetMyConnections = await connectionService.getAllmyConnections(userData.sub)

    res.status(responseGetMyConnections.statusCode).json({response: responseGetMyConnections.response})
  } catch (error) {
    res.status(500).json({ err: error.message });
  }  
})

router.get("/requests", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseGetMyRequests = await connectionService.getMyRequests(userData.sub);

    res.status(responseGetMyRequests.statusCode).json({ response: responseGetMyRequests.response });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

router.post("/connection", checkJwt, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);
    const { user_recipient } = req.body;

    const responseConnection = await connectionService.sendRequestConnection(
      userData.sub,
      user_recipient
    );

    res.status(responseConnection.statusCode).json({
      response: responseConnection.response,
    });
  } catch (error) {
    res.status(500).json({ err: "Error to send request" });
  }
});

router.put("/connection/:id", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseAccepting = await connectionService.Accepting(
      id,
      userData.sub
    );

    res.status(responseAccepting.statusCode).json({
      response: responseAccepting.response,
    });
  } catch (error) {
    res.status(500).json({ err: "Error accepting the request" });
  }
});

router.delete("/connection/:id", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const userData = await getTokenData(token);

    const responseRejecting = await connectionService.rejectRequest(id, userData.sub);
    res.status(responseRejecting.statusCode).json({
      response: responseRejecting.response,
    });
  } catch (error) {
    res.status(500).json({ err: "Error rejecting the request" });
  };
});

module.exports = router;
