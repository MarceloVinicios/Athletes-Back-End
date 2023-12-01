const knex = require("../database/connection");

class Publication_Model {
  async getAllPublications() {
    try {
      const publications = await knex.select().table("publications").orderBy('id', 'desc');
      const publicationsWithUserDetails = await Promise.all(publications.map(async (publication) => {
          const user = await knex.select().table("users").where({ id: publication.user_id }).first();
          const likes = await knex.select().table("likes").where({ publication_id: publication.id });
      
          return { 
              ...publication,
              user,
              likes: likes || []
          };
      }));
      
      return { status: true, response: publicationsWithUserDetails };
    } catch (error) {
      return { status: false, err: "Failed to retrieve publications" };
    }
  }

  async findById(id) {
    try {
      const responseGetPubliation = await knex.select().where({id}).table("publications");
      return { status: true, response: responseGetPubliation};
    } catch (error) {
      return { status: false, err: "error getting publication"};
    };
  };

  async findByIdPublication(id) {
    try {
      const publications = await knex.select().where({ id }).table("publications");
      const publication = publications[0];

      if (!publication) {
        return { status: true, notFound: true, err: "Publication not found" };
      }
      
      const userPromise = knex.select().table("users").where({ id: publication.user_id }).first();
      const likesPromise = knex.select().table("likes").where({ publication_id: publication.id });
  
      const [user, likes] = await Promise.all([userPromise, likesPromise]);
  
      const publicationWithDetails = {
        ...publication,
        user,
        likes: likes || []
      };
  
      return { status: true, response: publicationWithDetails };
    } catch (error) {
      return { status: false, err: error.message };
    }
  }

  async findAByCategory(category) {
    try {
      const publications = await knex.select().where({ category_id: category }).table("publications");

      const publicationsWithUserAndLikes = await Promise.all(publications.map(async (publication) => {
          const user = await knex.select().table("users").where({ id: publication.user_id }).first();
          const likes = await knex.select().table("likes").where({ publication_id: publication.id });
            
          return {
              ...publication,
              user,
              likes: likes || []
            };
        }));

        return { status: true, response: publicationsWithUserAndLikes };
    } catch (error) {
        return { status: false, err: error.message };
    }
  }


  async create(description, url, keyFile, user_id, category) {
    try {
      await knex.insert({description, url, key: keyFile, publication_at: knex.fn.now(), user_id, category_id: category}).table("publications");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error saving publication"};
    };
  };

  async update(id, description, url) {
    try {
      await knex.update({id, description, url}).where({id}).table("publications");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error update publication"};
    };
  };

  async destroy(id) {
    try {
      await knex.delete().where({id}).table("publications");
      return { status: true };
    } catch (error) {
      return { status: false, err: "error publication"};
    };
  };
};

module.exports = new Publication_Model();
