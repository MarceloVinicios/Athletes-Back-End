const CommentModel = require("../models/CommentModel")

class Comment_service {
  async getAllComment(){
  };

  async createComment(){
  };

  async updateComment(){
  };

  async deleteUserComment(id){
    if(isNaN(id)){
      return {statusCode: 500, message:"Invalid id"};
    };

    const getComment = await CommentModel.findById(id);
      if(!getComment.status) {
        return {statusCode: 500, response: getComment.err};
      }

      if(!getComment.response.length) {
        return {statusCode: 404, response:"Comment not found"};
      }

      const deleteComment = await CommentModel.delete(id)
        if(!deleteComment.status) {
          return {statusCode: 500, response: deleteComment.err};
        }

        return {statusCode: 200, response: "Comment deleted successfully"};
      } catch (error) {
        return {statusCode: 500, response: "Failed to delete comment"};
      };
  };


module.exports = new Comment_service();
