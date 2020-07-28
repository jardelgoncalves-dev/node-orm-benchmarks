const { Model } = require('objection');
const Post = require('./Post');

module.exports = class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings () {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: 'users.id',
          to: 'posts.user_id'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['first_name', 'last_name'],
  
      properties: {
        id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
      }
    }
  }
}