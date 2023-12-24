const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: [true, "Please provide the Employee Name"]
    },
    employeeID: {
        type: String,
        required: [true, "Please provide a ID"],
        unique: [true, "Duplicate Employee ID"]
    },
    employeeDepartment: {
        type: String,
        enum: ["Backend", "Frontend", "Intern"],
    },
    employeePosition: {
        type: String,
        required: [true, "Please provide a Position"],
    }
})


module.exports = mongoose.model("employee", employeeSchema)