//intialize of server
const express = require("express");
const { json, urlencoded } = require("body-parser");
const app = express();

//routes of modules
const taskRoutes = require("./task/task.route");
const userLogin = require("./users");

//Middleware
const auth = require("./middleware");

app.use(json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to REST API" });
});

app.use("/tasks", auth, taskRoutes);
app.use("/login", userLogin);

app.listen(3000, () => {
  console.log("Server online");
});
