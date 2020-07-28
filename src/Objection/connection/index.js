const knex = require('knex')(require('../../../knexfile').development);
const { Model } = require('objection');

module.exports = Model.knex(knex)