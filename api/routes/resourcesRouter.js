const express = require("express");

const Resources = require("../helpers/resourcesModel");

const db = require("../../data/db-config");

const { validateId, validateResource } = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
	Resources.find()
		.then(resources => res.status(200).json(resources))
		.catch(error =>
			res.status(500).json({ error: "Failed to get resources", error })
		);
});

router.get("/:id", validateId(db, "resources"), (req, res) => {
	res.status(200).json(req.response);
});

router.post("/", validateResource, (req, res) => {
	Resources.add(req.response)
		.then(resource => res.status(201).json(resource))
		.catch(error =>
			res.status(500).json({ error: "Failed to add resource", error })
		);
});

router.put(
	"/:id",
	validateId(db, "resources"),
	validateResource,
	(req, res) => {
		const { id } = req.params;

		Resources.update(id, req.response)
			.then(count => {
				count
					? res.status(200).json({ message: "Resource updated successfully" })
					: res
							.status(400)
							.json({ error: `Could not update resource with id ${id}` });
			})
			.catch(error =>
				res.status(500).json({ message: "Error updating the resource", error })
			);
	}
);

router.delete("/:id", validateId(db, "resources"), (req, res) => {
	const { id } = req.params;

	Resources.remove(id)
		.then(count =>
			count
				? res.status(200).json({ message: "Resource deleted successfully" })
				: res
						.status(400)
						.json({ message: `Could not delete resource with id ${id}` })
		)
		.catch(error =>
			res.status(500).json({ message: "Error deleting the resource", error })
		);
});

module.exports = router;
