const knex = require("../database/connection");

class Category_Model {
  async getAll() {
    try {
      const categories = await knex.select().table("categories");

      return { status: true, response: categories };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
}

module.exports = new Category_Model();
