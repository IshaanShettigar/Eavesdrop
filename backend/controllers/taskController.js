const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ msg: "Get All Tasks Route Hit Successfully", data: tasks })
}

const handleTaskApproveReject = async (req, res) => {
    const { action } = req.body;
    if (action === "approve") {
        await Task.findOneAndUpdate({ taskID: req.params.taskID }, { taskApproved: "yes" });
        res.status(200).json({ msg: "Approved Task" })

    }
    else if (action === "reject") {
        await Task.findOneAndUpdate({ taskID: req.params.taskID }, { taskApproved: "no" })
        res.status(200).json({ msg: "Rejected Task" })
    }
    else if (action === "not-yet") {
        await Task.findOneAndUpdate({ taskID: req.params.taskID }, { taskApproved: "not-yet" })
        res.status(200).json({ msg: "Neither Approved Nor Reject the Task" })
    }
    else {
        res.status(400).json({ msg: "Something went Wrong!" })
    }
}

const handleKanbanDrop = async (req, res) => {
    const { taskCompleted, taskReviewed } = req.body;
    await Task.findOneAndUpdate({ taskID: req.params.taskID }, { taskCompleted: taskCompleted, taskReviewed: taskReviewed })
    res.status(200).json({ msg: "Route working" })
}

const getKanbanTasks = async (req, res) => {
    const kanbantasks = await Task.find({ taskApproved: "yes" })
    res.status(200).json({ msg: "Get Kanban Tasks Route Hit Successfully", data: kanbantasks })
}

const filterKanban = async (req, res) => {
    const { priority, deadline } = req.body;
    let kanbantasks = null;
    if (priority && priority !== "None") {
        kanbantasks = await Task.find({ taskPriority: priority, taskApproved: "yes" })
    }
    else if (deadline) {
        console.log(deadline);
    }
    else {
        kanbantasks = await Task.find({ taskApproved: "yes" })
    }
    res.status(200).json({ msg: "Hit filter kanban", data: kanbantasks })
}
module.exports = { getAllTasks, getKanbanTasks, handleTaskApproveReject, handleKanbanDrop, filterKanban }