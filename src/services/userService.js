const axios = require("axios");
const UserModel = require("../models/UserModel");
const validationParams = require("../utils/validationParams");

class User_Service {
  async getUser(id) {
    try {
      if (!id) {
        return { statusCode: 400, response: "id undefined" };
      }
      const searchUser = await UserModel.getFindById(id);
      if (!searchUser.status) {
        return { statusCode: 500, response: searchUser.err };
      }
      return { statusCode: 200, response: searchUser.response };
    } catch (error) {
      return { statusCode: 500, response: "failed to get user" };
    }
  }

  async createUser(sub, email, name, picture, goal, category_id, city, state, country) {
    try {
      const validationResponse = validationParams.createAndUpdateUser(sub, email, name, picture, goal, category_id, city, state, country);
      if (validationResponse) {
        return { statusCode: 400, response: validationResponse };
      }

      const userExist = await UserModel.getFindByEmail(email);
      if (!userExist.status) {
        return {statusCode: 500, response: userExist.err}
      }

      if (userExist.response) {
        return {statusCode: 409, response: "The user already exists"}
      }

      const resultCreateUser = await UserModel.create(sub, email, name, picture, goal, category_id, city, state, country);
      if (!resultCreateUser.status) {
        return { statusCode: 500, response: resultCreateUser.err };
      }

      return { statusCode: 201, response: "User created" };
    } catch (err) {
      return { statusCode: 500, response: err.message };
    }
  }

  async updateUser(id, name, picture) {
    if (!name || !picture) {
      return { statusCode: 400, response: "namme or picture undefined" };
    }
    const uptadeModel = await UserModel.update(id, name, picture);
    if (!uptadeModel.status) {
      return { statusCode: 500, response: uptadeModel.err };
    }
    return { statusCode: 200, response: "uptade successfully" };
  }

  async deleteUser(id) {
    try {
      const searchUser = await UserModel.getFindById(id);
      if (!searchUser.status) {
        return { statusCode: 500, response: searchUser.err };
      }

      if (!searchUser.response.length) {
        return { statusCode: 404, response: "user not found for uptade" };
      }

      const deleteOneUser = await UserModel.delete(id);
      if (!deleteOneUser.status) {
        return { statusCode: 500, response: deleteOneUser.err };
      }

      return { statusCode: 200, response: "delete user successfully" };
    } catch (error) {
      return { statusCode: 500, response: "failed to delete user" };
    }
  }
}

module.exports = new User_Service();
