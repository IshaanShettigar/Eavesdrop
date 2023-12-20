const express = require('express')
const { getAllTasks, getKanbanTasks } = require('../controllers/taskController')

const taskRouter = express.Router()

taskRouter.get('/all', getAllTasks)
taskRouter.get('/kanban', getKanbanTasks)

module.exports = { taskRouter }