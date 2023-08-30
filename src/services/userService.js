class User_Service {
  async create() {
    const numero = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (numero > 5) {
      return {statusCode: 400, response: "teste de statuscode(erro)"}
    }

    return {statusCode: 201, response: "statuscode sucesso"}
  }
}

module.exports = new User_Service();