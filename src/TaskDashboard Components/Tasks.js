import React, { Fragment, createContext, useState, useEffect, useContext } from "react";
import { BsFillPersonFill, } from "react-icons/bs";
import { ImSpinner6 } from "react-icons/im";
import { TaskModal } from "./TaskModal";

const taskContext = createContext(null)

const Tasks = () => {
    const [tasks, setTasks] = useState([])
    const [spin, setSpin] = useState(true)

    useEffect(() => {
        const url = "http://localhost:5000/api/tasks/all"
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url);
                let json = await response.json();
                setSpin(false)
                json.data = json.data.map((task) => {
                    task.taskDeadline = new Date(task.taskDeadline.split('T')[0])
                    return task;
                })
                setTasks(json.data);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchTaskData();
    }, []);

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
                    {tasks.map((task) => {
                        return <TaskCard key={task.taskID} task={task} approved={task.taskApproved} onClick={onCardClick} />
                    })}
                </div>

                <TaskModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <div className={`fixed top-[45vh] left-[50vw] text-blue-600 animate-spin ${spin ? "opacity-100" : "opacity-0"}`}>
                    <ImSpinner6 size={100} />
                </div>
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