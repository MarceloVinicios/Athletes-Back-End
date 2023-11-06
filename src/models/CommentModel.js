const knex = require("../database/connection");

class Comment_Model {
  async getAll(publication_id) {
    try {
      const Comments = await knex.select().where({ publication_id: publication_id }).table("comments").orderBy('id', 'desc');
      const commentsWithUserDetails = await Promise.all(Comments.map(async (comment) => {
        const user = await knex.select().where({ id: comment.user_id }).table("users").first();
        return { ...comment, user };
      }));

      return { status: true, response: commentsWithUserDetails };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async findById(id) {
    try {
      const getOneComment = await knex.select().where({id}).table("comments");
      return { status: true, response: getOneComment};
    } catch (err) {
      return { status: false, err: "error getting comment"};
    }
  }

  async create(comment, publication_id, user_id) {
    try {
      await knex.insert({comment, publication_id, user_id}).table("comments");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error saving comment"};
    }
  }

  async update(comment, id) {
    try {
      await knex.update({comment}).where(id).table("comments");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error update comment"};
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({id}).table("comments");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error delete comment"};
    }
  }
}

module.exports = new Comment_Model();
