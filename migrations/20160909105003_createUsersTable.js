exports.up = function (knex) {
  return knex.schema.createTableIfNotExists('users', function (table) {
    table.increments()
    table.timestamps()
    table.string('name')
    table.string('email')
    table.string('password_hash')
    table.string('short_description')
    table.string('long_description')
    table.string('phone')
    table.string('image_link')
    table.string('github_link')
    table.string('cv_link')
    table.index('email')
  })
}

exports.down = function (knex) {
  return knex.dropTableIfExists('users')
}
