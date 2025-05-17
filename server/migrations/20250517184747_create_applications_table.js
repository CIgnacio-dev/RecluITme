export function up(knex) {
  return knex.schema.createTable("applications", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable(); // candidato
    table.integer("offer_id").unsigned().notNullable(); // oferta
    table.timestamp("created_at").defaultTo(knex.fn.now());

    table.unique(["user_id", "offer_id"]); // prevenir duplicados
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("applications");
}
