// @ts-check

export const up = (knex) => {
  return Promise.all([
    knex.schema.createTable('statuses', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password_digest');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('tasks', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('description');
      table.integer('statusId').unsigned().notNullable().references('statuses.id');
      table.integer('creatorId').unsigned().notNullable().references('users.id');
      table.integer('executorId').unsigned().references('users.id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    }),
  ]);}
  

  
  export const down = (knex) => {
    return Promise.all([
      knex.schema.dropTable('statuses'),
      knex.schema.dropTable('users'),
      knex.schema.dropTable('tasks'),
    ])
  }
  