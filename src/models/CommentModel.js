const knex = require("../database/connection");

class Comment_Model {
  async getAll() {
    try {
      const Comments = await knex.select().table("comment");
      const commentsWithUserDetails = await Promise.all(Comments.map(async (comment) => {
        const user = await knex.select().table("user").where({ id: comment.user_id }).first();
        return { ...Comments, user };
      }));
      
      return { status: true, response: commentsWithUserDetails};
    } catch (err) {
      return { status: false, err: "error getting all comment"};
    }
  }

  async findById(id) {
    try {
      const getOneComment = await knex.select().where({id}).table("comment");
      return { status: true, response: getOneComment};
    } catch (err) {
      return { status: false, err: "error getting comment"};
    }
  }

  async create(comment, user_id) {
    try {
      await knex.insert({comment, user_id}).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error saving comment"};
    }
  }

  async update(comment, id) {
    try {
      await knex.update({comment}).where(id).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error update comment"};
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({id}).table("comment");
      return { status: true };
    } catch (err) {
      return { status: false, err: "error delete comment"};
    }
  }
}

module.exports = new Comment_Model();
