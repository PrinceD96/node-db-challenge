const db = require("../../data/db-config");
const mappers = require("./mappers");

const find = () => {
	return db("tasks").then(tasks => tasks.map(task => mappers.taskToBody(task)));
};

const findById = id => {
	return db("tasks")
		.where({ id })
		.first()
		.then(task => (task ? mappers.taskToBody(task) : null));
};

const add = task => {
	return db("tasks").insert(task);
};

const update = (id, changes) => {
	return db("tasks").where({ id }).update(changes);
};

const remove = id => {
	return db("tasks").where({ id }).del();
};

module.exports = {
	find,
	findById,
	add,
	update,
	remove
};
