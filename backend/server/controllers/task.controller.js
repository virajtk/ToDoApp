const { TaskModel } = require("../models/task.model");

const createTask = async (req, res) => {
    const formData = {
        user: req.user.id,
        desc: req.body.desc
    }

    try {
        const createdTask = await TaskModel.create(formData);

        res.status(201).json({ data: createdTask });
    } catch (error) {
        res.status(500).json({ errors: error });
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.find({user: req.user.id});

        res.status(201).json({ data: tasks });
    } catch (error) {
        res.status(500).json({ errors: error });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id })
            .populate({
                path: "user",
                model: "User"
            });

        if (task) {
            res.status(200).json({ data: task });
        } else {
            res.status(404).json({ errors: "Task has not found" });
        }
    } catch (error) {
        res.status(500).json({ errors: error });
    }
}

const updateTask = async (req, res) => {
    const formData = {
        desc: req.body.desc,
        status: req.body.status,
        updated_at: new Date()
    }

    if (!req.body.desc) {
        delete formData.desc;
    }

    if (!req.body.status) {
        delete formData.status;
    }

    try {
        const task = await TaskModel.findOne({ _id: req.params.id });

        if (task) {
            let updatedTask = Object.assign(task, formData);
            updatedTask = await updatedTask.save();

            res.status(200).json({ data: updatedTask });
        } else {
            res.status(404).json({ errors: "Task has not found" });
        }
    } catch (error) {
        res.status(500).json({ errors: error });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findOne({ _id: req.params.id });

        if (task) {
            await TaskModel.deleteOne({ _id: req.params.id });
            res.status(204).json({ data: {} });
        } else {
            res.status(404).json({ errors: "Task has not found" });
        }
    } catch (error) {
        res.status(500).json({ errors: error });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
}
