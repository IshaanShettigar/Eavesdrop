const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    projectName: {
        type: String
    },
    creatorEmail: {
        type: String
    },
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
    taskTags: {
        type: String // This will be comma separated string
    },
    taskType: {
        type: String,
        enum: ["Improvement", "Bug-Fix", "New-Feature", "Sub-Task", "Miscellaneous"]
    },
    taskAssignees: {
        type: String  // This will be comma separated string
    },
    taskDepartments: {
        type: String // This will be a comma separated string FrontEnd, BackEnd, QA, MLOps,  Tech-Support, Design
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