const { Model } = require('objection');
const User = require('./User');

module.exports = class Post extends Model {
  static get tableName() {
    return 'posts';
  }

  static get relationMappings () {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'posts.user_id',
          to: 'user.id'
        }
      }
    }
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['user_id', 'title', 'description', 'content'],
  
      properties: {
        user_id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1, maxLength: 255 },
        content: { type: 'string', minLength: 1 },
      }
    }
  }
}