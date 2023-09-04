const PublicationModel = require('../models/PublicationModel');

class Publication_Service {
  async getAll() {};

  async get() {
  };

  async create(title, description) {
    if (title == undefined ||title == "") {
      return {status: false, statusCode: 400, msg: 'Title is required'};
    };

    const responseCreate = await PublicationModel.create(title, description);
    if (!responseCreate.status) {
      return {status: false, statusCode: 500, msg: responseCreate.err};
    };

    return {status: true};
  };

  async update() {
  };

  async delete() {
  };
};

module.exports = new Publication_Service();
