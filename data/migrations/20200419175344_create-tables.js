exports.up = function (knex) {
	return knex.schema
		.createTable("resources", tbl => {
			tbl.increments();
			tbl.string("resource_name", 16).unique().notNullable();
			tbl.string("resource_description");
		})
		.createTable("projects", tbl => {
			tbl.increments();
			tbl.string("project_name", 16).notNullable();
			tbl.string("project_description", 128);
			tbl.boolean("completed").notNullable().defaultTo(false);
		})
		.createTable("tasks", tbl => {
			tbl.increments();
			tbl
				.integer("project_id")
				.unsigned()
				.notNullable()
				.references("projects.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl.string("task_description", 128).notNullable();
			tbl.string("task_notes");
			tbl.boolean("completed").notNullable().defaultTo(false);
		})
		.createTable("projects_resources", tbl => {
			tbl.increments();
			tbl
				.integer("project_id")
				.unsigned()
				.notNullable()
				.references("projects.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
			tbl
				.integer("resource_id")
				.unsigned()
				.notNullable()
				.references("resources.id")
				.onUpdate("CASCADE")
				.onDelete("CASCADE");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("projects_resources")
		.dropTableIfExists("tasks")
		.dropTableIfExists("projects")
		.dropTableIfExists("resources");
};
