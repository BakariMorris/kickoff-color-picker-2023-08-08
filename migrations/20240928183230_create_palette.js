exports.up = function(knex) {
  return knex.schema.createTable("palettes", function (table) {
    table.increments("id");
    table.string("name");
    table.text("colors");
  })
}


exports.down = function(knex) {
  return knex.schema.dropTable("palettes");
}