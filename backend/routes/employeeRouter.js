const express = require("express")
const { addEmployee, getEmployee } = require("../controllers/employeeController")
const employeeRouter = express.Router()

employeeRouter.get('/', getEmployee)
employeeRouter.post('/', addEmployee)

module.exports = { employeeRouter }