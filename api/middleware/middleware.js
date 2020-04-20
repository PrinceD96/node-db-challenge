const validateId = (db, tableName) => (req, res, next) => {
	const { id } = req.params;

	db(`${tableName}`)
		.where({ id })
		.first()
		.then(response => {
			response
				? (req.response = response)
				: res.status(400).json({ message: "Invalid Id" });
			next();
		})
		.catch(error =>
			res.status(500).json({ message: "Could not validate", error })
		);
};

const validateProject = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing project data" })
		: !body.project_name
		? res.status(400).json({
				message: "missing required project_name	field"
		  })
		: (req.response = body);
	next();
};

const validateResource = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing resource data" })
		: !body.resource_name
		? res.status(400).json({
				message: "missing required resource_name field"
		  })
		: (req.response = body);
	next();
};

const validateTask = (req, res, next) => {
	const { body } = req;

	JSON.stringify(body) === "{}"
		? res.status(400).json({ message: "missing task data" })
		: !body.project_id
		? res.status(400).json({
				message: "missing required project_id field"
		  })
		: !body.task_description
		? res.status(400).json({
				message: "missing required task_description field"
		  })
		: (req.response = body);
	next();
};

module.exports = {
	validateId,
	validateProject,
	validateResource,
	validateTask
};
