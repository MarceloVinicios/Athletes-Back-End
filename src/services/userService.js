const axios = require("axios");
const UserModel = require("../models/UserModel");


class User_Service {
  async acessToken(token) {
    return axios.get(
      "https://dev-v6oinruanic8adgg.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  async getAll(){
  };

  async getUser(){
  };

  async createUser(){
  };

  async updateUser(){
  };

  async deleteUser(){
  };
};

module.exports = new User_Service();
