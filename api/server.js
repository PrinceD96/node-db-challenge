const express = require("express");
const helmet = require("helmet");

const resourcesRouter = require("./routes/resourcesRouter");
const projectsRouter = require("./routes/projectsRouter");
const tasksRouter = require("./routes/tasksRouter");

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/resources", resourcesRouter);
server.use("/api/projects", projectsRouter);
server.use("/api/tasks", tasksRouter);

server.get("/", (req, res) => {
	res.status(200).json({ Api: "up" });
});

module.exports = server;
