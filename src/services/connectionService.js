const ConnectionModel = require("../models/ConnectionModel");
const UserModel = require("../models/UserModel");

class Connection_service {
  async getAllUserForConnect(id) {
    try {
      if (!isNaN(id) || id.length <= 0) {
        return { statusCode: 400, response: "Id invalid" };
      }
  
      const responseGetMyConnections = await ConnectionModel.getAllUserForConnect(id);
  
      if (!responseGetMyConnections.status) {
        return { statusCode: 500, response: responseGetMyConnections.error };
      }
  
      if (!responseGetMyConnections.response.length) {
        return { statusCode: 204 };
      }
  
      return { statusCode: 200, response: responseGetMyConnections.response };
    } catch (error) {
      return { statusCode: 500, error: "Error getting my connections" };
    }
  }
  
  async getAllmyConnections(id) {
    try {
      if (!isNaN(id) || id.length <= 0) {
        return { statusCode: 400, response: "Id invalid" };
      }

      const responseGetMyConnections = await ConnectionModel.getMyConnections(id);
      if (!responseGetMyConnections.status) {
        return { statusCode: 500, response: responseGetMyConnections.error};
      };

      if (!responseGetMyConnections.response.length) {
        return { statusCode: 204 }
      }

      return {statusCode: 200, response: responseGetMyConnections.response};
    } catch (error) {
      return { statusCode: 500, error: "Error getting my connections" };
    }
  }

  async getMyRequests(id) {
    try {
      if (!isNaN(id) || id.length <= 0) {
        return { statusCode: 400, response: "Id invalid" };
      }
  
      const responseGetMyRequests = await ConnectionModel.getRequestsForMe(id);
      if (!responseGetMyRequests.status) {
        return { statusCode: 500, response: responseGetMyRequests.error };
      }

      if (!responseGetMyRequests.response.length) {
        return { statusCode: 204 };
      }
  
      return { statusCode: 200, response: responseGetMyRequests.response };
    } catch (error) {
      return { statusCode: 500, error: "Error getting my requests" };
    }
  }  

  async sendRequestConnection(user_send, user_recipient) {
    try {
      if (!user_send || !user_recipient) {
        return { statusCode: 400, response: "Invalid credentials" };
      }

      const [userExistSend, userExistRecipient] = await Promise.all([
        UserModel.getFindById(user_send),
        UserModel.getFindById(user_recipient),
      ]);

      if (!userExistSend.status) {
        return { statusCode: 500, response: userExistSend };
      }

      if (!userExistRecipient.status) {
        return { statusCode: 500, response: userExistRecipient };
      }

      if (
        !userExistRecipient.response.length ||
        !userExistRecipient.response.length
      ) {
        return {
          statusCode: 404,
          response: "User not found for sending or receiving",
        };
      }

      const responseSaveRequestConnection = await ConnectionModel.sendRequest(
        user_send,
        user_recipient
      );

      if (!responseSaveRequestConnection.status) {
        return {
          statusCode: 500,
          response: responseSaveRequestConnection.error,
        };
      }

      return { statusCode: 201 };
    } catch (error) {
      return { statusCode: 500, response: "Failed to send request" };
    }
  }

  async Accepting(id, user_recipient) {
    try {
      if (isNaN(id) || id.length <= 0) {
        return { statusCode: 400, response: "Id invalid" };
      }

      const responseExistRequest = await ConnectionModel.getRequest(id);
      if (!responseExistRequest.status) {
        return { statusCode: 500, response: responseExistRequest.error };
      }

      if (!responseExistRequest.response) {
        return { statusCode: 404, response: "Request does not exist" };
      }

      if (responseExistRequest.response.user_recipient != user_recipient) {
        return { statusCode: 404, response: "User not found to this request" };
      }

      const responseAccepting = await ConnectionModel.accepting(id);
      if (!responseAccepting.status) {
        return { statusCode: 500, response: responseAccepting.error };
      }

      return { statusCode: 200, response: "Request accepted" };
    } catch (error) {
      return { statusCode: 500, response: error.message };
    }
  }

  async rejectRequest(id, user) {
    try {
      if (isNaN(id) || id.length <= 0) {
        return { statusCode: 400, response: "Id invalid" };
      }

      const responseExistRequest = await ConnectionModel.getRequest(id);
      if (!responseExistRequest.status) {
        return { statusCode: 500, response: responseExistRequest.error };
      }

      if (!responseExistRequest.response) {
        return { statusCode: 404, response: "Request does not exist" };
      }

      if (
        responseExistRequest.response.user_recipient !== user &&
        responseExistRequest.response.user_sender !== user
      ) {
        return { statusCode: 404, response: "User not found to this request" };
      }

      const responseRejecting = await ConnectionModel.rejectRequest(id);
      if (!responseRejecting.status) {
        return { statusCode: 500, response: responseRejecting.error };
      }

      return { statusCode: 200, response: "Request rejected" };
    } catch (error) {
      return { statusCode: 500, response: error.message };
    }
  }
}

module.exports = new Connection_service();
