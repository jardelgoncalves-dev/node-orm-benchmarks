const knex = require('knex')(require('../../knexfile').development)

module.exports = (table) => {
  return knex.raw('truncate table ' + table + ' cascade');
};