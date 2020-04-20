const db = require("../../data/db-config");

const find = () => {
	return db("projects");
};

const findById = id => {
	return db("projects").where({ id }).first();
};

const findResourcesByProjectId = projectId => {
	return db
		.select("r.id", "r.resource_name", "r.resource_description")
		.from("resources as r")
		.where({ project_id: projectId })
		.innerJoin("projects_resources as pr", "r.resource_id", "pr.project_id");
};

const findTasksByProjectId = projectId => {
	return db
		.select(
			"tasks.id",
			"tasks.task_description",
			"tasks.task_notes",
			"tasks.completed"
		)
		.from("tasks")
		.where({ project_id: projectId })
		.innerJoin("projects", "projects.id", "tasks.project_id");
};

const add = project => {
	return db("projects").insert(project);
};

const update = (id, changes) => {
	return db("projects").where({ id }).update(changes);
};

const remove = id => {
	return db("projects").where({ id }).del();
};

module.exports = {
	find,
	findById,
	findResourcesByProjectId,
	findTasksByProjectId,
	add,
	update,
	remove
};
