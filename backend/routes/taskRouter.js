const express = require('express')
const { getAllTasks, getKanbanTasks, handleTaskApproveReject, handleKanbanDrop, filterKanban } = require('../controllers/taskController')

const taskRouter = express.Router()

taskRouter.get('/all', getAllTasks)
taskRouter.get('/kanban', getKanbanTasks)
taskRouter.post('/kanban', filterKanban)
taskRouter.post('/kanban/:taskID', handleKanbanDrop)
taskRouter.post('/:taskID', handleTaskApproveReject)

module.exports = { taskRouter }