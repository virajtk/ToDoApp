const express = require("express");

const taskCtrl = require("../controllers/task.controller");

const router = express.Router();

router.route("/")
    .post(taskCtrl.createTask)
    .get(taskCtrl.getTasks);

router.route("/:id")
    .get(taskCtrl.getTaskById)
    .put(taskCtrl.updateTask)
    .delete(taskCtrl.deleteTask);

module.exports = {
    router
}
