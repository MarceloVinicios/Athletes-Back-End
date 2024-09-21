const knex = require("../database/connection");

class Message_Model {
  async getOldMessages(user, recipient) {
    try {
      const messagesWithReceptorId = await knex("messages")
        .select()
        .where("receptor_id", recipient)
        .where("send_id_user", user);

      const messagesWithSendIdUser = await knex("messages")
        .select()
        .where("receptor_id", user)
        .where("send_id_user", recipient);

      const combinedMessages = [
        ...messagesWithReceptorId,
        ...messagesWithSendIdUser,
      ];

      combinedMessages.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });

      return { status: true, response: combinedMessages };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }

  async create(message, send_id_user, receptor_id) {
    try {
      await knex
        .insert({
          message,
          send_id_user,
          receptor_id,
          created_at: knex.raw("NOW()"),
        })
        .table("messages");
      return { status: true };
    } catch (err) {
      return { status: false, err: err.message };
    }
  }
}

module.exports = new Message_Model();
