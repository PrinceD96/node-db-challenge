const db = require("../../data/db-config");

const find = () => {
	return db("tasks");
};

const findById = id => {
	return db("tasks").where({ id }).first();
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
