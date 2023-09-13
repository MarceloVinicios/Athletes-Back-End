const knex = require("../database/connection");

class Publication_Model {
// Dentro de PublicationModel
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


  async getOnePublication(id) {
    try {
      await knex.select().where(id).table("publication");
      return { status: true };
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

  async update(name, size, key, url, id) {
    try {
      await knex.update({name, size, key, url}).where(id).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error update publication"};
    };
  };

  async delete(id) {
    try {
      await knex.delete().where(id).table("publication");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error publication"};
    };
  };
};

module.exports = new Publication_Model();
