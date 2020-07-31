const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const connection = new Sequelize(dbConfig.development);

const User = require('../models/User')
const Post = require('../models/Post')

User.init(connection);
Post.init(connection);

User.associate(connection.models);
Post.associate(connection.models);

module.exports = connection;