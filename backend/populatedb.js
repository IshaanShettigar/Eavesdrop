// Run this in the beginning ONLY IF you are just setting up your db with some data
const mongoose = require('mongoose')
require('dotenv').config()
const Task = require('./models/Task')

console.log(Task)

const tasks = [
    {
        "taskName": "Create another sheet that has cost summaries for all components/connectors",
        "taskDescription": "In the last call the stakeholders stressed on the importance of having another sheet where the costs are displayed. ",
        "taskPriority": "High",
        "taskID": "1",
        "taskDeadline": new Date(),
        "taskApproved": "yes",
        "taskCompleted": "yes",
        "taskReviewed": "yes",
        "taskBacklog": "no",
    },
    {
        "taskName": "[BUG] Sidebar tooltip is being displayed below (Z) tasks",
        "taskDescription": "Tooltip in the sidebar is being displayed in the lower z-index. Correcting the z-index also doesn't fix this. Please look into this issue",
        "taskPriority": "Medium",
        "taskID": "2",
        "taskDeadline": new Date(),
        "taskApproved": "no",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "Fix the hover modal position when modal is out of bounds for PLET and UTH",
        "taskDescription": "The hover modal is wildly out of position due to the fact that we are defining the distance of the modal from the hovered coordinates in terms of the elements height (in case of out of bounds on the Y axis) and width (in case of out of bounds on the X axis). This is an error simply due to the fact that these elements PLET and UTH have a much larger size. Not visually tho,\
        the elements bounding box is itself larger than the others.\nPossible solutions:\nRedefine/Re-draw them.\nFigure out a different way to display the out of bounds cases.",
        "taskPriority": "Low",
        "taskID": "3",
        "taskDeadline": new Date(),
        "taskApproved": "yes",
        "taskCompleted": "yes",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "When refreshing the page or opening a diagram that you just saved, the linsk dont show up cause of some error",
        "taskDescription": "When refreshing the page or saving and loading a diagram, the link color disappears. This is cause something weird happens when it saves it, I do not know what. Look at localstorage under the links attrs. Something weird is happeniing",
        "taskPriority": "Low",
        "taskID": "4",
        "taskDeadline": new Date(),
        "taskApproved": "yes",
        "taskCompleted": "yes",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "New Feature: When the user drags an element out of bounds then translate the paper in that direction",
        "taskDescription": "This feature is needed to navigate complex diagrams.",
        "taskPriority": "Medium",
        "taskID": "5",
        "taskDeadline": new Date(),
        "taskApproved": "not-yet",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "Use browser local storage to store the current sessions state ",
        "taskDescription": "This is a required feature as the user should not have the inconvenience of redrawing the diagrams if they accidentally close the tab.\nPossible ways to save the diagram: \n Ctrl + S triggers the saving\nSave every 5 minutes/1 minutes/30 seconds.\nSave once every graph.on('change', function)  event\nWe will be utilizing browser local storage",
        "taskPriority": "High",
        "taskID": "6",
        "taskDeadline": new Date(),
        "taskApproved": "not-yet",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "Platform element doesnt scale properly. I messed up the calc expressions somewhere",
        "taskDescription": ".",
        "taskPriority": "Low",
        "taskID": "7",
        "taskDeadline": new Date(),
        "taskApproved": "not-yet",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {
        "taskName": "Add a 'Supported Databases' section in the homepage ",
        "taskDescription": "",
        "taskPriority": "Low",
        "taskID": "8",
        "taskDeadline": new Date(),
        "taskApproved": "not-yet",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    },
    {

        "taskName": "Integrate the new parameters into the application.",
        "taskDescription": "Make sure to dynamically assign the necessary parameters every time the application is loaded up.",
        "taskPriority": "High",
        "taskID": "9",
        "taskDeadline": new Date(),
        "taskApproved": "not-yet",
        "taskCompleted": "no",
        "taskReviewed": "no",
        "taskBacklog": "no",
    }
]

const populate = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected successfully to Database")
    await Task.deleteMany()
    console.log("Successfully deleted Database Contents")
    await Task.insertMany(tasks)
    console.log("Inserted into Collection Successfully")
}

populate()