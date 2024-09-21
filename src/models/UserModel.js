const knex = require("../database/connection");

class User_Model {
  async getAllUsers() {
    try {
      const getAllUser = await knex.select().table("users");
      return { status: true, response: getAllUser };
    } catch (error) {
      return { status: false, error: "error getting all users" };
    }
  }

  async getFindById(id) {
    try {
      const user = await knex.select().where({ id }).table("users");

      if (user.length === 0) {
        return { status: false, err: "User not found" };
      }

      const responseUserWithCategory = await Promise.all(
        user.map(async (user) => {
          if (user.category_id) {
            const category = await knex.select().where({ id: user.category_id }).table("categories");
            return { ...user, category };
          } else {
            return { ...user, category: null };
          }
        })
      );

      return { status: true, response: responseUserWithCategory };
    } catch (error) {
      return { status: false, err: error.message };
    }
  }


  async getFindByEmail(email) {
    try {
      const user = await knex.select().where({ email }).table("users");
      return { status: true, response: user[0] };
    } catch (error) {
      return { status: false, err: "error getting user" };
    }
  }

  async create(
    id,
    email,
    name,
    picture,
    goal,
    category_id,
    city,
    state,
    country
  ) {
    const transaction = await knex.transaction();

    try {
      await transaction
        .insert({ id, email, name, picture, goal, category_id })
        .table("users");
      await transaction
        .insert({ city, state, country, user_id: id })
        .table("address");
      await transaction.commit();

      return { status: true };
    } catch (error) {
      await transaction.rollback();
      return { status: false, err: error };
    }
  }

  async update(dataUser, id) {
    try {
      await knex.update(dataUser).where(id).table("users");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error when updating user" };
    }
  }

  async delete(id) {
    try {
      await knex.delete().where(id).table("users");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error delete user" };
    }
  }
}

module.exports = new User_Model();
