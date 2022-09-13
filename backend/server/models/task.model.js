const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "User is required",
    },
    desc: {
        type: String,
        required: "Task is required",
        unique: "Task is already exists"
    },
    status: {
        type: String,
        required: "Status is required",
        default: "TODO"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = {
    "TaskModel": mongoose.model("Task", TaskSchema)
}
