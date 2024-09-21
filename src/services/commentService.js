const CommentModel = require("../models/CommentModel");
const PublicationModel = require("../models/PublicationModel");
const UserModel = require("../models/UserModel");

class Comment_service {
  async getAllComment(publication_id) {
    try {
      if (isNaN(publication_id) || publication_id <= 0) {
        return {statusCode: 400, response: "Invalid id"};
      };

      const responseGetAllComment = await CommentModel.getAll(publication_id);
      if (!responseGetAllComment.status) {
        return {statusCode: 500, response: responseGetAllComment.msg};
      };

      if (!responseGetAllComment.response.length) {
        return { statusCode: 204};
      };

      return { statusCode: 200, response: responseGetAllComment.response };
    } catch (error) {
      return { statusCode: 500, response: "Failed to retrieve all comments" };
    };
  };

  async createComment(comment, publication_id, user_id) {
    try {
      if (!user_id || !publication_id) {
        return { statusCode: 400, response: "User_id and publication_id is required" };
      };

      if (!comment) {
        return { statusCode: 400, response: "Comment is required"};
      };

      const [responsePublicationExists, responseUserExists] = await Promise.all([
        PublicationModel.findById(publication_id),
        UserModel.getFindById(user_id),
      ]);

      if (!responsePublicationExists.status || !responseUserExists.status) {
        return { statusCode: 500, response:  responseUserExists};
      };

      if (!responsePublicationExists.response.length || !responseUserExists.response.length) {
        return { statusCode: 404, response: "Publication not found or User does not exist"};
      };

      const responseCreate = await CommentModel.create(comment, publication_id, user_id);
      if (!responseCreate.status){
          return{ statusCode: 500, response: responseCreate.err};
      };

      return {statusCode: 201, response: "Comment created successfully"};
    } catch (error) {
      return { statusCode: 500, response: responseGetAllComment };
    };
  }
;
   async updateComment(dataUser, id) {
    try {
      if (isNaN(id)){
        return {statusCode: 400, response: "id is invalid"}
      }

      const responseid = await comment.FindById(id);
      if(!responseid.status) {
        return {statusCode: 400, response: responseid.err}
      }

      if (responseid.response.length <= 0) {
          return {statusCode: 404, response: "comment not updated"};
      };
    }catch (error) {
      return { statusCode: 500, response: responseGetAllComment };
    };
  };

  async deleteUserComment(id, user_id){
    try {
      if(isNaN(id)){
        return {statusCode: 400, message:"Invalid id"};
      };

      const getComment = await CommentModel.findById(id);
      if(!getComment.status) {
        return {statusCode: 500, response: getComment.err};
      };

      if(!getComment.response.length) {
        return {statusCode: 404, response:"Comment not found"};
      };

      if(getComment.response[0].user_id != user_id) {
        return {statusCode: 403, response:"You do not have permission to delete this comment."};
      };

      const deleteComment = await CommentModel.delete(id);
      if(!deleteComment.status) {
        return {statusCode: 500, response: deleteComment.err};
      };

      return {statusCode: 200, response: "Comment deleted successfully"};
    } catch (error) {
      return {statusCode: 500, response: "Failed to delete comment"};
    };
  };
};

module.exports = new Comment_service();
