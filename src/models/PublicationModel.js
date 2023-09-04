const knex = require("../database/connection");

class Publication_Model {
  async getAll() {
    try {
      await knex.select().table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error getting all posts", msg: error.message };
    };
  };

  async getOne(id) {
    try {
      await knex.select().where(id).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error getting publication", msg: error.message };
    };
  };

  async create(name, size, key, url) {
    try {
      await knex.insert({name, size, key, url}).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error saving publication", msg: error.message };
    };
  };

  async update(name, size, key, url, id) {
    try {
      await knex.update({name, size, key, url}).where(id).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error update publication", msg: error.message };
    };
  };

  async delete(id) {
    try {
      await knex.delete().where(id).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error publication", msg: error.message };
    };
  };
};

module.exports = new Publication_Model();
