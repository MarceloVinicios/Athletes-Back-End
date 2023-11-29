const knex = require("../database/connection");

class Category_Model {
  async getAll() {
    try {
      const categories = await knex.select().table("categories");

      return { status: true, response: categories };
    } catch (err) {
      return { status: false, err: "Error getting all categories" };
    };
  };

  async getByCategory(category) {
    try {
      const responseExistCategory = await knex.select().where({id: category}).table("categories");
      return {status: true, response: responseExistCategory};
    } catch (err) {
      return { status: false, err: "Error get to category" };
    };
  };
};

module.exports = new Category_Model();
