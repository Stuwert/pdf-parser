
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('first_name')
    table.string('last_name')
    table.integer('zip_code')
    table.string('city')
    table.string('state')
    table.string('latitude')
    table.string('longitude')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
