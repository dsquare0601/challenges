const router = require("express").Router();
const controlller = require("./task.controller");
const { getTasks, addTasks, updateTasks, deleteTasks } = controlller;

router.get("/", getTasks);
router.get("/:id", getTasks);
router.post("/", addTasks);
router.put("/:id", updateTasks);
router.delete("/:id", deleteTasks);

module.exports = router;
