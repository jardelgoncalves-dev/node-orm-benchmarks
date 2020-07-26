
exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id');
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.json('col_json').defaultTo({ "test": 1, "test2": 2, "test3": "text" });
  table.jsonb('col_jsonb').defaultTo({ "test": 1, "test2": 2, "test3": "text" });
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
  table.timestamp('deleted_at').nullable();  
})

exports.down = knex => knex.schema.dropTable('users')