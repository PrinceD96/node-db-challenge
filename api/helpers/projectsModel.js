const db = require("../../data/db-config");
const mappers = require("./mappers");

const find = () => {
	return db("projects").then(projects =>
		projects.map(project => mappers.projectToBody(project))
	);
};

const findById = id => {
	let query = db("projects as p");

	return query
		.select(
			"p.id",
			"p.project_name as name",
			"p.project_description as description",
			"p.completed"
		)
		.where({ id })
		.first()
		.then(project => mappers.projectToBody(project));
};

const findResourcesByProjectId = projectId => {
	return db
		.select(
			"r.id",
			"r.resource_name as name",
			"r.resource_description as description"
		)
		.from("resources as r")
		.innerJoin("projects_resources as pr", "r.id", "pr.resource_id")
		.where({ "pr.project_id": projectId });
};

const findTasksByProjectId = projectId => {
	return db
		.select(
			"tasks.id",
			"tasks.task_description as description",
			"tasks.task_notes as notes",
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
