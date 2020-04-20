const express = require("express");

const Projects = require("../helpers/projectsModel");

const db = require("../../data/db-config");

const { validateId, validateProject } = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
	Projects.find()
		.then(projects => res.status(200).json(projects))
		.catch(error =>
			res.status(500).json({ error: "Failed to get Projects", error })
		);
});

router.get("/:id", validateId(db, "projects"), (req, res) => {
	// res.status(200).json(req.response);
	const { id } = req.params;

	Projects.findResourcesByProjectId(id).then(resources =>
		res.status(200).json(resources)
	);

	// Projects.findById(id)
	// 	.then(project => {
	// 		Projects.findTasksByProjectId(id)
	// 			.then(tasks => {
	// 				Projects.findResourcesByProjectId(id)
	// 					.then(resources => {
	// 						resources
	// 							? res.status(200).json({ ...project, tasks, resources })
	// 							: res
	// 									.status(400)
	// 									.json({ error: "No resources found for this project" });
	// 					})
	// 					.catch(error =>
	// 						res.status(500).json({
	// 							error: `Failed to get resources for project with id ${id}`,
	// 							error
	// 						})
	// 					);
	// 			})
	// 			.catch(error =>
	// 				res.status(500).json({
	// 					error: `Failed to get tasks for project with id ${id}`,
	// 					error
	// 				})
	// 			);
	// 	})
	// 	.catch(error =>
	// 		res
	// 			.status(500)
	// 			.json({ error: `Failed to get project with id ${id}`, error })
	// 	);
});

router.post("/", validateProject, (req, res) => {
	Projects.add(req.response)
		.then(project => res.status(201).json(project))
		.catch(error =>
			res.status(500).json({ error: "Failed to add project", error })
		);
});

router.put("/:id", validateId(db, "projects"), validateProject, (req, res) => {
	const { id } = req.params;

	Projects.update(id, req.response)
		.then(count => {
			count
				? res.status(200).json({ message: "Project updated successfully" })
				: res
						.status(400)
						.json({ error: `Could not update project with id ${id}` });
		})
		.catch(error =>
			res.status(500).json({ message: "Error updating the project", error })
		);
});

router.delete("/:id", validateId(db, "projects"), (req, res) => {
	const { id } = req.params;

	Projects.remove(id)
		.then(count =>
			count
				? res.status(200).json({ message: "Project deleted successfully" })
				: res
						.status(400)
						.json({ message: `Could not delete project with id ${id}` })
		)
		.catch(error =>
			res.status(500).json({ message: "Error deleting the project", error })
		);
});

module.exports = router;
