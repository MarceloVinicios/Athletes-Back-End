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

  async getFindByEmail(email) {
    try {
      const user = await knex.select().where({email}).table("user");
      return { status: true, response: user[0] };
    } catch (error) {
      return { status: false, err: "error getting user" };
    };
  };

  async create(id, email, name, picture, goal, category_id, city, state, country) {
    const transaction = await knex.transaction();

    try {
      await transaction.insert({ id, email, name, picture, goal, category_id }).table('user');
      await transaction.insert({ city, state, country, user_id: id }).table('address');
      await transaction.commit();

      return { status: true };
    } catch (error) {
      await transaction.rollback();
      return { status: false, err: error };
    }
  }

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
