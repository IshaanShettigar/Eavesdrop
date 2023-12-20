const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({ msg: "Get All Tasks Route Hit Successfully", data: tasks })
}

const getKanbanTasks = async (req, res) => {
    const kanbantasks = await Task.find({ taskApproved: "yes" })
    res.status(200).json({ msg: "Get Kanban Tasks Route Hit Successfully", data: kanbantasks })
}

module.exports = { getAllTasks, getKanbanTasks }