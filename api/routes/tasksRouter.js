const express = require("express");

const Tasks = require("../helpers/tasksModel");

const db = require("../../data/db-config");

const { validateId, validateTask } = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
	Tasks.find()
		.then(tasks => res.status(200).json(tasks))
		.catch(error =>
			res.status(500).json({ error: "Failed to get tasks", error })
		);
});

router.get("/:id", validateId(db, "tasks"), (req, res) => {
	const { id } = req.params;

	Tasks.findById(id)
		.then(task => res.status(200).json(task))
		.catch(error =>
			res.status(500).json({ error: `Failed to get task with id ${id}`, error })
		);
});

router.post("/", validateTask, (req, res) => {
	Tasks.add(req.response)
		.then(task => res.status(201).json(task))
		.catch(error =>
			res.status(500).json({ error: "Failed to add task", error })
		);
});

router.put("/:id", validateId(db, "tasks"), validateTask, (req, res) => {
	const { id } = req.params;

	Tasks.update(id, req.response)
		.then(count => {
			count
				? res.status(200).json({ message: "Task updated successfully" })
				: res
						.status(400)
						.json({ error: `Could not update task with id ${id}` });
		})
		.catch(error =>
			res.status(500).json({ message: "Error updating the task", error })
		);
});

router.delete("/:id", validateId(db, "tasks"), (req, res) => {
	const { id } = req.params;

	Tasks.remove(id)
		.then(count =>
			count
				? res.status(200).json({ message: "Task deleted successfully" })
				: res
						.status(400)
						.json({ message: `Could not delete task with id ${id}` })
		)
		.catch(error =>
			res.status(500).json({ message: "Error deleting the task", error })
		);
});

module.exports = router;
