import React, { useState, useEffect, createContext } from "react";
import { FaFilter } from "react-icons/fa"

const FilterBy = ({ setCompleted, setIncomplete, setReviewed, setBacklog, setSpin }) => {
    const [filter, setFilter] = useState("")
    // fetch with options set to priority: filter
    useEffect(() => {
        setSpin(true)
        const url = "http://localhost:5000/api/tasks/kanban"
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "priority": filter
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
        console.log(options.body);
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url, options);
                const json = await response.json();
                setSpin(false)
                setCompleted(json.data.filter((task) => task.taskCompleted && !task.taskReviewed));
                setReviewed(json.data.filter((task) => task.taskReviewed && task.taskCompleted));
                setIncomplete(json.data.filter((task) => !task.taskCompleted && !task.taskReviewed && !task.taskBacklog));
                setBacklog(json.data.filter((task) => !task.taskCompleted && !task.taskReviewed && task.taskBacklog));
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchTaskData()

    }, [filter])
    return (
        <div className=" relative">
            <div className="text-gray-400 absolute top-3 left-4 border-r">
                <div className="flex gap-2 items-center">
                    <FaFilter size={20} />
                    <span className="w-full ">Filter</span>
                </div>
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}
                className="pl-20 h-12 p-2 rounded-lg focus:outline-blue-400 hover:cursor-pointer outline-gray-200 outline-2 outline">
                <option>None</option>
                <option value="High">Priority - High</option>
                <option value="Medium">Priority - Medium</option>
                <option value="Low">Priority - Low</option>
            </select>
        </div>
    )
}

export { FilterBy }