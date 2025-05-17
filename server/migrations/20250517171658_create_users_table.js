export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.string("user_type").notNullable(); // candidato, empresa, reclutador
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
