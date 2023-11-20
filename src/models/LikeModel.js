const knex = require("../database/connection");

class Category_Model {
  async getLikeOfOnePublication(publication_id) {
    try {
      const responseMoreLike = await knex
        .select()
        .where({ publication_id: publication_id })
        .table("likes");
      return { status: true, response: responseMoreLike };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async addLikeToAPublication(user_id, publication_id) {
    try {
      await knex
        .insert({ like: 1, publication_id, user_id, liked_at: knex.fn.now() })
        .table("likes");

      return {status: true}
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
}

module.exports = new Category_Model();
