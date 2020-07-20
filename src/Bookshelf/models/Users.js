const connection = require('../connection');
const Posts = require('./Posts');

module.exports = connection.model('users', {
  tableName: 'users',
  posts() {
    return this.hasMany(Posts)
  }
})