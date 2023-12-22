import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AssigneeIcon } from "../TaskDashboard Components/Tasks";
import { BsFillPersonFill } from "react-icons/bs";
import { kanbanModalContext } from "./KanbanBoard";



const KanbanModal = ({ open = true, onClose }) => {

    const { modalState, setModalState } = useContext(kanbanModalContext);

    return (
        // backdrop
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors
                        ${open ? "visible bg-black/40 backdrop-blur-sm" : "invisible"}`}>
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"} w-1/2`}>
                <button onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <IoCloseSharp size={28} />
                </button>


                <label className="font-bold text-lg block ">Task Name</label>
                <input type="text" value={modalState["taskName"]} onChange={(e) => setModalState({ ...modalState, "taskName": e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-2" readOnly />

                <label className="font-bold text-lg block mt-4">Task Description</label>
                <textarea value={modalState["taskDescription"]} onChange={(e) => setModalState({ ...modalState, "taskDescription": e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-2" readOnly />


                <div className="flex gap-4 items-center text-gray-800 text-sm mt-6">
                    <label className="font-bold text-lg block ">Assignees:</label>
                    <div className="flex gap-2">
                        <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                        <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                        <AssigneeIcon icon={<BsFillPersonFill size={18} />} />
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-4">
                    <label className="font-bold text-lg">Priority: </label>
                    <input value={modalState["taskPriority"]} onChange={(e) => setModalState({ ...modalState, "taskPriority": e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 my-2"
                        readOnly />


                </div>

                <div className="flex items-center gap-6 mt-4">
                    <label className="font-bold text-lg">Deadline:  </label>
                    <span>{String(modalState["taskDeadline"]).split("T")[0] + " " + String(modalState["taskDeadline"]).split("T")[1]}</span>
                </div>
            </div>
        </div>
    )
}


export { KanbanModal }