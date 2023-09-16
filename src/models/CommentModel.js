const knex = require("../database/connection");

class Comment_Model {
  async getAll() {
    try {
      await knex.select().table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error getting all comment", msg: err.message };
    }
  }

  async create(comment, user_id) {
    try {
      await knex.insert({comment, user_id}).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error saving comment", msg: err.message };
    }
  }

  async update(comment, id) {
    try {
      await knex.update({comment}).where(id).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error update comment", msg: err.message };
    }
  }

  async delete(id) {
    try {
      await knex.delete().where(id).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error delete comment", msg: err.message };
    }
  }
}

module.exports = new Comment_Model();
