const getAllTasks = (req, res) => {
    res.status(200).json({ msg: "Get All Tasks Route Hit Successfully" })
}

const getKanbanTasks = (req, res) => {
    res.status(200).json({ msg: "Get Kanban Tasks Route Hit Successfully" })
}

module.exports = { getAllTasks, getKanbanTasks }