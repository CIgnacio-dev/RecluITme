export function up(knex) {
  return knex.schema.createTable("offers", (table) => {
    table.increments("id").primary();
    table.integer("company_id").unsigned().notNullable(); // FK al usuario
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.string("modality").notNullable(); // Remoto, Presencial...
    table.string("contract_type").notNullable(); // Full-time, Freelance...
    table.string("seniority").notNullable(); // Junior, Senior...
    table.string("specialty").notNullable(); // Frontend, Backend...
    table.timestamps(true, true);
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("offers");
}
