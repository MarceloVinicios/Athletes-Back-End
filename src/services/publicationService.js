const PublicationModel = require('../models/PublicationModel');

class Publication_Service {
  async getAll() {
    try {
      
    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication", message: error.message}
    }
  };

  async get() {
    try {
      
    } catch (error) {
      return {statusCode: 500, error: "Failed to create publication", message: error.message}
    }
  };

  async create(description, url, user_id) {
    try {
      if (description == 0 && url == 0) {
        return {statusCode: 400, response: "Description or url is required"};
      }

      const responseCreatePublication = await PublicationModel.create(description, url, user_id);
      if (!responseCreatePublication.status) {
        return {statusCode: 500, response: responseCreatePublication.err}
      }
    
      return {statusCode: 200, response: "Publication created successfully"}
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
