exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("resources")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("resources").insert([
				{
					id: 1,
					resource_name: "Visual Studio Code",
					resource_description:
						"Visual Studio Code is a code editor redefined and optimized for building and debugging modern web and cloud applications."
				},
				{
					id: 2,
					resource_name: "DB Designer",
					resource_description:
						"Online Database Schema Design and Modeling Tool"
				},
				{
					id: 3,
					resource_name: "Postman",
					resource_description: "The Collaboration Platform for API Development"
				}
			]);
		});
};
