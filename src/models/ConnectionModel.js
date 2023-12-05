const knex = require("../database/connection");

class Connection_Model {
  async getAllUserForConnect(id) {
    try {
      const usersSender = await knex('connections')
        .select('user_recipient')
        .where({ user_sender: id })
        .whereIn('state', [0, 1]);
  
      const usersSenderIds = usersSender.map(user => user.user_recipient);
  
      const usersRecipient = await knex('connections')
        .select('user_sender')
        .where({ user_recipient: id })
        .whereIn('state', [0, 1]);
  
      const usersRecipientIds = usersRecipient.map(user => user.user_sender);
  
      const connectedUserIds = [...usersSenderIds, ...usersRecipientIds];
  
      const usersNotConnected = await knex('users')
        .select('id', 'name', 'picture', 'email')
        .whereNotIn('id', connectedUserIds)
        .whereNot('id', id);
  
      return { status: true, response: usersNotConnected };
    } catch (error) {
      return { status: false, error: "Erro ao obter usuários não conectados" };
    }
  }
  

  async getMyConnections(id) {
    try {
      const myConnectionsDetails = await knex('users')
        .select('users.id', 'users.name', 'users.picture', 'users.email')
        .whereNot('users.id', id)
        .whereIn('users.id', function () {
          this.select('connections.user_recipient')
            .from('connections')
            .where({ state: 1, user_sender: id })
            .union(function () {
              this.select('connections.user_sender')
                .from('connections')
                .where({ state: 1, user_recipient: id });
            });
        });
  
      return { status: true, response: myConnectionsDetails };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }  

  async getRequestsForMe(id) {
    try {
      const myRequestsDetails = await knex('connections')
        .select()
        .where({
          state: 0,
          user_recipient: id,
        })
        .leftJoin('users', function () {
          this.on('connections.user_sender', '=', 'users.id');
        })
        .select('users.id as sender_id', 'users.name as sender_name', 'users.picture as sender_picture', 'users.email as sender_email')
        .whereNot('users.id', id);
  
      return { status: true, response: myRequestsDetails };
    } catch (error) {
      return { status: false, error: "Error getting my requests" };
    }
  }
  
  async sendRequest(user_sender, user_recipient) {
    try {
      await knex
        .insert({ user_sender, user_recipient, state: 0 })
        .table("connections");

      return { status: true };
    } catch (error) {
      return { status: false, error: "Error to send request" };
    }
  }

  async getRequest(id) {
    try {
      const response = await knex
        .select()
        .where({ id })
        .table("connections")
        .first();

      return { status: true, response };
    } catch (error) {
      return { status: false, error: error.message };
    }
  }

  async accepting(id) {
    try {
      await knex.update({ state: 1 }).where({ id }).table("connections");

      return { status: true };
    } catch (error) {
      return { status: false, error: "Error updating the request" };
    }
  }

  async rejectRequest(id) {
    try {
      await knex.delete().where({ id }).table("connections");

      return {status: true}
    } catch (error) {
      return { status: false, error: "Error reject the request" };
    }
  }
}

module.exports = new Connection_Model();
