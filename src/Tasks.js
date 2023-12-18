import React, { Fragment, createContext, useState, useEffect } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { TaskModal } from "./TaskModal";

const taskContext = createContext(null)

const Tasks = () => {
    const [tasks, setTasks] = useState([
        {
            "taskName": "Create another sheet that has cost summaries for all components/connectors",
            "taskDescription": "In the last call the stakeholders stressed on the importance of having another sheet where the costs are displayed. ",
            "taskPriority": "High",
            "taskID": "1",
            "taskDeadline": new Date(),
            "taskApproved": "not-yet"
        },
        {
            "taskName": "[BUG] Sidebar tooltip is being displayed below (Z) tasks",
            "taskDescription": "Tooltip in the sidebar is being displayed in the lower z-index. Correcting the z-index also doesn't fix this. Please look into this issue",
            "taskPriority": "Medium",
            "taskID": "2",
            "taskDeadline": new Date(),
            "taskApproved": "no"
        },
        {
            "taskName": "Fix the hover modal position when modal is out of bounds for PLET and UTH",
            "taskDescription": "The hover modal is wildly out of position due to the fact that we are defining the distance of the modal from the hovered coordinates in terms of the elements height (in case of out of bounds on the Y axis) and width (in case of out of bounds on the X axis). This is an error simply due to the fact that these elements PLET and UTH have a much larger size. Not visually tho,\
            the elements bounding box is itself larger than the others.\nPossible solutions:\nRedefine/Re-draw them.\nFigure out a different way to display the out of bounds cases.",
            "taskPriority": "Low",
            "taskID": "3",
            "taskDeadline": new Date(),
            "taskApproved": "yes"

        }])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalState, setModalState] = useState({
        "taskID": "", "taskName": "", "taskDescription": "", "taskPriority": "", "taskDeadline": new Date()
    })


    const onCardClick = (taskID, taskName, taskDescription, taskPriority, taskDeadline, taskApproved) => {
        setModalState({
            "taskID": taskID,
            "taskName": taskName,
            "taskDescription": taskDescription,
            "taskPriority": taskPriority,
            "taskDeadline": taskDeadline,
            "taskApproved": taskApproved
        })
        setIsModalOpen(true)
    }


    useEffect(() => {
        // Update tasks when modalState changes
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                // Check if taskID matches modalState.taskID
                if (task.taskID === modalState.taskID) {
                    // Update the matching task with the new modalState values
                    return { ...task, ...modalState };
                } else {
                    // Return the unchanged task if the taskID doesn't match
                    return task;
                }
            });
        });
    }, [modalState])


    return (
        <taskContext.Provider value={{ modalState, setModalState }}>
            <Fragment>
                <div className="grid grid-cols-3 gap-6 ml-24 mr-8 my-8 ">
                    {/* Once we implement a fetch api then based on that we need to dynamically create a div and make sure only 3 Task's per line*/}
                    <TaskCard task={tasks[0]} approved={tasks[0].taskApproved} onClick={onCardClick} />
                    <TaskCard task={tasks[1]} approved={tasks[1].taskApproved} onClick={onCardClick} />
                    <TaskCard task={tasks[2]} approved={tasks[2].taskApproved} onClick={onCardClick} />
                </div>
                <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

            </Fragment>
        </taskContext.Provider>
    );
};

const TaskCard = ({ approved = "not-yet", task, onClick }) => {

    return (
        <div className={`border-t-8 ${approved === "yes" ? "border-green-600" : approved === "no" ? "border-red-500" : "border-gray-500"}
                         cursor-pointer shadow-xl bg-slate-50 hover:bg-gray-200 flex flex-col gap-4 px-2 py-3 
                         hover:scale-105 transform transition duration-200 h-full` }
            onClick={() => onClick(task["taskID"], task["taskName"], task["taskDescription"], task["taskPriority"], task["taskDeadline"], task["taskApproved"])}>

            <span className="text-gray-800"><strong>Task Name: </strong> {task["taskName"]}</span>

            <span className="text-sm text-gray-800">
                <strong>Task Description: </strong>
                {task["taskDescription"].length > 140 ? task["taskDescription"].slice(0, 140) + "..." : task["taskDescription"]}
            </span>



            <div className="flex gap-4 items-center text-gray-800 text-sm">
                <span className="block"><strong>Assigned: </strong></span>
                <div className="flex gap-2">
                    <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                    <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                    <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                </div>
            </div>

            <span className="text-sm"><strong>Priority: </strong>{task["taskPriority"]}</span>

            <span className="text-sm"><strong>Deadline: </strong>{task["taskDeadline"].toString().split(' ').slice(0, 5).map((element) => element + " ")}</span>
        </div>
    )
}


const AssigneeIcon = ({ icon }) => {
    return (
        <div className="shadow-sm bg-violet-500 text-white rounded-2xl p-2">
            {icon}
        </div>
    )
}


export { Tasks, taskContext, AssigneeIcon };