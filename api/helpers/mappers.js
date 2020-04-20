const intToBoolean = int => {
	return int === 1 ? true : false;
};

const projectToBody = project => {
	const result = {
		...project,
		completed: intToBoolean(project.completed)
	};

	project.tasks
		? (result.tasks = project.tasks.map(task => ({
				...tasks,
				completed: intToBoolean(task.completed)
		  })))
		: null;

	return result;
};

const taskToBody = task => {
	return { ...task, completed: intToBoolean(task.completed) };
};

module.exports = {
	intToBoolean,
	projectToBody,
	taskToBody
};
