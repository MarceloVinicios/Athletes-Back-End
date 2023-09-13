const PublicationModel = require("../models/PublicationModel");

class Publication_Service {
  async getAll() {
    try {
      const responseGetAllPublication = await PublicationModel.getAllPublications()
      if (!responseGetAllPublication.status) {
        return {statusCode: 500, response: responseGetAllPublication.err}
      }      

      if (!responseGetAllPublication.response.length) {
        return {statusCode: 204, response: "No content"}
      }

      return {statusCode: 200, response: responseGetAllPublication.response}
    } catch (error) {
      return {statusCode: 500, response: "Failed to create publication"}
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

      const responseCreatePublication = await PublicationModel.create(description, url, user_id);
      if (!responseCreatePublication.status) {
        return {statusCode: 500, response: responseCreatePublication.err}
      }
    
      return {statusCode: 201, response: "Publication created successfully"}
    } catch (error) {
      return {statusCode: 500, response: error.message}
    }
  };

  async update() {
    try {
      
    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication", message: error.message}
    }
  };

  async delete() {
    try {
      
    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication", message: error.message}
    }
  };
};

module.exports = new Publication_Service();
