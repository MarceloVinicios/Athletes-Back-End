const CommentModel = require("../models/CommentModel")

class Comment_service {
  async getAllComment(req,res) {
    try{
      const responseGetAllComment = await CommentModel.getAll();
      if (!responseGetAllComment.status) {
        return {statusCode: 500, response: responseGetAllComment.msg}
      }
    }
      if (responseGetAllComment.data.lenght > 0) {

      }
    } 
  }

  async createComment(comment){
    if(comment == undefined || comment ==""){
      return { statusCode: 400, msg: 'Comment is required'};
      
    };

    const responseCreate = await CommentModel.create(title, description);
    if(!responseCreate.status) {
      return { statusCode: 500, msg: responseCreate.err};
    };
  
    return {status: true};
  }

  async updateComment(){
  
  
  
  };


  async deleteUserComment(){
  };
};

module.exports = new Comment_service();
