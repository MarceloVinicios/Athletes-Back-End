const knex = require("../database/connection");

class Publication_Model {
  async getAllPublications() {
    try {
      const publications = await knex.select().table("publication");
      const publicationsWithUserDetails = await Promise.all(publications.map(async (publication) => {
        const user = await knex.select().table("user").where({ id: publication.user_id }).first();
        return { ...publication, user };
      }));
      
      return { status: true, response: publicationsWithUserDetails };
    } catch (error) {
      return { status: false, err: "Failed to retrieve publications" };
    }
  }
  
  async findById(id) {
    try {
      const responseGetPubliation = await knex.select().where({id}).table("publication");
      return { status: true, response: responseGetPubliation};
    } catch (error) {
      return { status: false, err: "error getting publication"};
    };
  };

  async create(description, url, user_id) {
    try {
      await knex.insert({description, url, user_id}).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error saving publication"};
    };
  };

  async update(id, description, url) {
    try {
      await knex.update({id, description, url}).where({id}).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error update publication"};
    };
  };

  async destroy(id) {
    try {
      await knex.delete().where({id}).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error publication"};
    };
  };
};

module.exports = new Publication_Model();
