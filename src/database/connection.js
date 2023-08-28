require('dotenv').config();

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host : process.env.HOST,
    user : process.env.USERCONNECTION,
    password : process.env.PASSWORDCONNETION,
    database : process.env.DATABASENAME
  }
});

module.exports = knex;
