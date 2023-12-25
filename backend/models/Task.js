const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskID: {
        type: String,
    },
    taskName: {
        type: String,
        required: [true, "Please provide a taskName"],
        unique: [true, "Duplicate Task Name"]
    },
    taskDescription: {
        type: String,
        default: ["."]
    },
    taskPriority: {
        type: String,
        enum: ["Low", "High", "Medium"],
        default: ["Low"]
    },
    taskStartTime: {
        type: Date,
    },
    taskDeadline: {
        type: Date,
    },
    taskApproved: {
        type: String,
        enum: ["yes", "no", "not-yet"],
        default: ["not-yet"]
    },
    taskCompleted: {
        type: Boolean,
        default: true
    },
    taskReviewed: {
        type: Boolean,
        default: true
    },
    taskBacklog: {
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("tasks", taskSchema)