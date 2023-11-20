const { response } = require("express");
const LikeModel = require("../models/LikeModel");
const PublicationModel = require("../models/PublicationModel");

class Like_service {
  async addLikeToPublication(user_id, publication_id) {
    try {
      const responsePublicationExist = await PublicationModel.findById(publication_id);
      if (!responsePublicationExist.status) {
        return { statusCode: 500, response:  responsePublicationExist.err};
      };

      if (!responsePublicationExist.response.length) {
        return {statusCode: 404, response: "Publication not found to add like"};
      };

      const responseAddLikeToPublication = await LikeModel.addLikeToAPublication(user_id, publication_id);
      if (!responseAddLikeToPublication.status) {
        return { statusCode: 500, response: responseAddLikeToPublication.err};
      };

      return { statusCode: 200, response: "Like added successfully"};
    } catch (error) {
      return { statusCode: 500, response: error.message};
    };
  };
};

module.exports = new Like_service();
