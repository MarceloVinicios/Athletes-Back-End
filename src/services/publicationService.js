const PublicationModel = require("../models/PublicationModel");

class Publication_Service {
  async getAll() {
    try {
      const getAllPublication = await PublicationModel.getAllPublications()
      if (!getAllPublication.status) {
        return {statusCode: 500, response: getAllPublication.err}
      }      

      if (!getAllPublication.response.length) {
        return {statusCode: 204}
      }

      return {statusCode: 200, response: getAllPublication.response}
    } catch (error) {
      return {statusCode: 500, response: "Failed to get all publications"}
    }
  };

  async get() {
    try {
      
    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication"}
    }
  };

  async create(description, url, user_id) {
    try {
      if (!description && !url) {
        return {statusCode: 400, response: "description or url not specified"}
      } 

      const createPublication = await PublicationModel.create(description, url, user_id);
      if (!createPublication.status) {
        return {statusCode: 500, response: createPublication.err}
      }
    
      return {statusCode: 201, response: "Publication created successfully"}
    } catch (error) {
      return {statusCode: 500, response: "Failed to create publication"}
    }
  };

  async update() {
    try {
      
    } catch (error) {
      return {statusCode: 500, response: error.message}
    }
  };

  async delete(id) {
    try {
      if (isNaN(id)) {
        return {statusCode: 404, response: "Id is not a number"};
      };

      const getPublication = await PublicationModel.getOnePublication(id);
      if (!getPublication.status) {
        return {statusCode: 500, response: getPublication.err};
      };

      if (!getPublication.response.length) {
        return {statusCode: 404}
      }

      const deletePublication = await PublicationModel.delete(id);
      if (!deletePublication.status) {
        return {statusCode: 500, response: deletePublication.err}
      }

      return {statusCode: 200, response: "Publication deleted successfully"};
    } catch (error) {
      return {statusCode: 500, response: "Failed to delete publication"};
    };
  };
};

module.exports = new Publication_Service();
