const PublicationModel = require("../models/PublicationModel");
const UserModel = require("../models/UserModel");
const CommentModel = require("../models/CommentModel");
const confiS3 = require("../utils/configS3")

class Publication_Service {
  async getAll() {
    try {
      const getAllPublication = await PublicationModel.getAllPublications();
      if (!getAllPublication.status) {
        return {statusCode: 500, response: getAllPublication.err};
      };

      if (!getAllPublication.response.length) {
        return {statusCode: 204};
      };

      return {statusCode: 200, response: getAllPublication.response};
    } catch (error) {
      return {statusCode: 500, response: "Failed to get all publications"};
    };
  };

  async get() {
    try {

    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication"};
    };
  };

  async create(description, url, keyFile, user_id) {
    try {
      if (!description) {
        return {statusCode: 400, response: "description or url not specified"};
      } ;

      const createPublication = await PublicationModel.create(description, url, keyFile, user_id);
      if (!createPublication.status) {
        return {statusCode: 500, response: createPublication.err};
      };

      return {statusCode: 201, response: "Publication created successfully"};
    } catch (error) {
      return {statusCode: 500, response: error.message};
    };
  };

  async update(id, description, url, user_id) {
    try {
      if (!isNaN(id) || id <= 0) {
        return {statusCode: 400, response: "Invalid id"};
      };

      if (!description || !url) {
        return {statusCode: 400, response: "description or url not specified"};
      };

      const [responsePublicationExists, responseUserExists] = await Promise.all([
        PublicationModel.findById(id),
        UserModel.getFindById(user_id),
      ]);

      if (!responsePublicationExists.status || !responseUserExists.status) {
        return { statusCode: 500, response:  responseUserExists};
      };

      if (!responsePublicationExists.response.length) {
        return {statusCode: 404, response: "User not found to edit publication"};
      };

      const responseUpdatePublication = await PublicationModel.update(id, description, url);
      if (!responseUpdatePublication.status) {
        return {statusCode: 500, response: responseUpdatePublication.err};
      };

      return {statusCode: 200, response: "Publication updated successfully"};
    } catch (error) {
      return {statusCode: 500, response: error.message};
    };
  };

  async delete(id, user_id) {
    try {
      if (isNaN(id)) {
        return {statusCode: 400, response: "Invalid id"};
      };

      const getPublication = await PublicationModel.findById(id);
      if (!getPublication.status) {
        return {statusCode: 500, response: getPublication.err};
      };

      if (!getPublication.response.length) {
        return {statusCode: 404};
      };

      if(getPublication.response[0].user_id != user_id) {
        return {statusCode: 403, response:"You do not have permission to delete this publication."}
      }

      const deletePublication = await PublicationModel.destroy(id);
      if (!deletePublication.status) {
        return {statusCode: 500, response: deletePublication.err};
      };

      if (process.env.STORAGE_TYPE === "s3") {
        await confiS3().deleteObject({
          Bucket: process.env.BUCKET_NAME,
          Key: getPublication.response[0].key,
        }).promise();
      }

      return {statusCode: 200, response: "Publication deleted successfully"};
    } catch (error) {
      return {statusCode: 500, response: "Failed to delete publication"};
    };
  };
};

module.exports = new Publication_Service();
