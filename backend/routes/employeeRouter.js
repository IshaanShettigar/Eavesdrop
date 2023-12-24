const express = require("express")
const { addEmployee } = require("../controllers/employeeController")
const employeeRouter = express.Router()

employeeRouter.post('/', addEmployee)

module.exports = { employeeRouter }