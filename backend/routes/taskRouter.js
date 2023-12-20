const express = require('express')
const { getAllTasks, getKanbanTasks, handleTaskApproveReject } = require('../controllers/taskController')

const taskRouter = express.Router()

taskRouter.get('/all', getAllTasks)
taskRouter.get('/kanban', getKanbanTasks)
taskRouter.post('/:taskID', handleTaskApproveReject)


module.exports = { taskRouter }