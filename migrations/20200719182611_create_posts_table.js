
exports.up = knex => knex.schema.createTable('posts', table => {
  table.increments('id');
  table.integer('user_id').unsigned();
  table.foreign('user_id').references('users.id');
  table.string('title').notNullable();
  table.string('description').notNullable();
  table.bigInteger('likes').defaultTo(100);
  table.text('content');
  table.boolean('private').defaultTo(false);
  table.float('col_float').defaultTo(222.22);
  table.decimal('col_decimal').defaultTo(22.22);
  table.date('col_date').defaultTo('2020/02/20');
  table.enu('col_enum', ['value1', 'value2']).defaultTo('value1');
  table.json('col_json').defaultTo({ "test": 1, "test2": 2, "test3": "text" });
  table.jsonb('col_jsonb').defaultTo({ "test": 1, "test2": 2, "test3": "text" });
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
  table.timestamp('deleted_at').nullable();
})

exports.down = knex => knex.schema.dropTable('posts')