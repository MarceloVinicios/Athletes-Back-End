class User_Service {
  async create() {
    const numero = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (numero > 5) {
      return {statusCode: 400, response: "Sei lá"}
    }

    return {statusCode: 201, response: "yeah"}
  }
}

module.exports = new User_Service();