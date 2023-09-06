const knex = require('../database/connection');

class User_Model {
  async getAll() {
    try {
      await knex.select().table("user");
      return { status: true };
    } catch (error) {
      return { status: false, error: "error getting all users", msg: error.message };
    };
  };

  async getFindById(id) {
    try {
      const user = await knex.select().where({id}).table("user");
      return { status: true, response: user };
    } catch (error) {
      return { status: false, err: "error getting user", msg: error.message };
    };
  };

  async create(id, name, email, picture) {
    try {
      await knex.insert({id, name, email, picture}).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error saving user", msg: error.message };
    };
  };

  async update(dataUser, id) {
    try {
      await knex.update(dataUser).where(id).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error when updating user", msg: error.message };
    };
  };

  async delete(id) {
    try {
      await knex.delete().where(id).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error delete user", msg: error.message };
    };
  };
};

module.exports = new User_Model();
