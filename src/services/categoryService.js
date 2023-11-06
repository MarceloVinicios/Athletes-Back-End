const CategoryModel = require("../models/CategoryModel");

class Category_service {
  async getAllCategory() {
    try {
      const responseGetAllComment = await CategoryModel.getAll();
      if (!responseGetAllComment.status) {
        return { statusCode: 500, response: responseGetAllComment.msg };
      }

      if (!responseGetAllComment.response.length) {
        return { statusCode: 204 };
      }

      return { statusCode: 200, response: responseGetAllComment.response };
    } catch (error) {
      return { statusCode: 500, response: "Failed to retrieve all comments" };
    }
  }
}

module.exports = new Category_service();
