exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("projects")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("projects").insert([
				{
					id: 1,
					project_name: "Node-DB-Challenge",
					project_description:
						"In this challenge, you design and build a Data Model and a RESTful API that stores data into a Relational Database."
				}
			]);
		});
};
