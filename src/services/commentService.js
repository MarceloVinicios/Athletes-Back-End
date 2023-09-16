const CommentModel = require("../models/CommentModel");
const UserModel = require("../models/UserModel");

class Comment_service {
  async getAllComment() {
    try {
      const responseGetAllComment = await CommentModel.getAll();
      if (!responseGetAllComment.status) {
        return { statusCode: 500, response: responseGetAllComment.msg };
      }

      if (!responseGetAllComment.response > 0) {
        return { statusCode: 204 };
      }
      return { statusCode: 200, response: responseGetAllComment.msg };
    } catch (error) {
      return { statusCode: 500, response: responseGetAllComment.msg };
    }
  }

  async createComment(comment, user_id) {
    try {
      if (!comment) {
        return { statusCode: 400, response: "Comment is required" };
      }

      if (!user_id) {
        return { statusCode: 400, response: "User_id is required" };
      }

      const responseGetUser = await UserModel.getFindById(user_id);
      if (!responseGetUser.status) {
        return { statusCode: 500, response: responseGetUser.err };
      }

      if (!responseGetUser.response.length) {
        return { statusCode: 404, response: "User not found" };
      }

      const responseCreate = await CommentModel.create(comment, user_id);
      if (!responseCreate.status){
          return{ statusCode: 500, response: responseCreate.err}
      }

      return {statusCode: 201, response: "Comment created successfully"}

    } catch (error) {
      return { statusCode: 500, response: responseGetAllComment };
    }
  }
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
        return {statusCode: 404, response: "comment not updated"}
    }



   }
  }

}

module.exports = new Comment_service();
