exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments()
    table.timestamps()
    table.string('name')
    table.string('email').notNullable()
    table.string('password_hash')
    table.string('short_description')
    table.text('long_description')
    table.string('phone')
    table.string('image_link')
    table.string('github_link')
    table.string('cv_link')
    table.index('email')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users')
}
