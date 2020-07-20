const connection = require('../connection');
const Users = require('./Users');

module.exports = connection.model('posts', {
  tableName: 'posts',
  users() {
    return this.belongsTo(Users)
  }
})