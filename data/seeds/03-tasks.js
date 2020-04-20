exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex("tasks")
		.truncate()
		.then(function () {
			// Inserts seed entries
			return knex("tasks").insert([
				{
					id: 1,
					project_id: 1,
					task_description: "Create a forked copy of this project."
				},
				{
					id: 2,
					project_id: 1,
					task_description: "Add your Team Lead as collaborator on Github.",
					task_notes: "DM them the invitation link for faster approval."
				},
				{
					id: 3,
					project_id: 1,
					task_description: "Clone your forked version of the Repository.",
					task_notes: "Not Lambda's repo."
				}
			]);
		});
};
