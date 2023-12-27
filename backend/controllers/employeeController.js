const Employee = require('../models/Employee')


const addEmployee = async (req, res) => {
    const { employeeName, employeeID, employeeDepartment, employeePosition } = req.body;
    const emp = await Employee.create({ employeeName: employeeName, employeeID: employeeID, employeeDepartment: employeeDepartment, employeePosition: employeePosition })
    res.status(200).json({ msg: "Success!", "EmployeeDetails": emp })
}

const getEmployee = async (req, res) => {
    const emps = await Employee.find({})
    res.status(200).json({ msg: "Got employees, enjoy", data: emps })
}

module.exports = { addEmployee, getEmployee }