const db = require("../../data/db-config");

const find = () => {
	return db("resources");
};

const findById = id => {
	return db("resources").where({ id }).first();
};

const add = resource => {
	return db("resources").insert(resource);
};

const update = (id, changes) => {
	return db("resources").where({ id }).update(changes);
};

const remove = id => {
	return db("resources").where({ id }).del();
};

module.exports = {
	find,
	findById,
	add,
	update,
	remove
};
