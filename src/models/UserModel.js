const knex = require('../database/connection');

class User_Model {
  async getAll() {
    try {
      const getAllUser = await knex.select().table("user");
      return { status: true, response: getAllUser };
    } catch (error) {
      return { status: false, error: "error getting all users"};
    };
  };

  async getFindById(id) {
    try {
      const user = await knex.select().where({id}).table("user");
      return { status: true, response: user };
    } catch (error) {
      return { status: false, err: "error getting user" };
    };
  };

  async create(id, name, email, picture) {
    try {
      await knex.insert({id, email, name  , picture}).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error saving user" };
    };
  };

  async update(dataUser, id) {
    try {
      await knex.update(dataUser).where(id).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error when updating user" };
    };
  };

  async delete(id) {
    try {
      await knex.delete().where(id).table("user");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error delete user"};
    };
  };
};

module.exports = new User_Model();
