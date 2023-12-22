import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { AssigneeIcon, taskContext } from "./Tasks";
import { BsFillPersonFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const TaskModal = ({ open = false, onClose }) => {

    const { modalState, setModalState } = useContext(taskContext);

    const disabledButton = "opacity-50 cursor-not-allowed";

    const url = "http://localhost:5000/api/tasks/"
    const onClickReject = () => {
        if (modalState["taskApproved"] === "not-yet") {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "action": "reject"
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            fetch(url + `${modalState["taskID"]}`, options).then((response) => { return response.json() }).then((data) => console.log(data.msg))

            onClose()
            setModalState({ ...modalState, "taskApproved": "no" })
        }
    }

    const onClickApprove = () => {
        if (modalState["taskApproved"] === "not-yet" || modalState["taskApproved"] === "no") {

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "action": "approve"
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            fetch(url + `${modalState["taskID"]}`, options).then((response) => { return response.json() }).then((data) => console.log(data.msg))

            onClose()
            setModalState({ ...modalState, "taskApproved": "yes" })
        }

    }

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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-2" />

                <label className="font-bold text-lg block mt-4">Task Description</label>
                <textarea value={modalState["taskDescription"]} onChange={(e) => setModalState({ ...modalState, "taskDescription": e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-2 h-auto" />


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
                    <select value={modalState["taskPriority"]} onChange={(e) => setModalState({ ...modalState, "taskPriority": e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 my-2">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="flex items-center gap-6 mt-4">
                    <label className="font-bold text-lg">Deadline:  </label>
                    <label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={modalState["taskDeadline"]} onChange={(date) => setModalState({ ...modalState, "taskDeadline": date })}
                            customInput={<CustomInputDatePicker />} />
                    </label>
                </div>



                <div className="flex justify-around mt-10">
                    <button className={`py-2 px-6 text-lg bg-green-600 border-2 font-semibold border-green-600 rounded-2xl
                    text-white  transition-all duration-200 
                    ${modalState["taskApproved"] === "yes" ? disabledButton : "hover:text-green-600 hover:border-green-600 hover:bg-white "}`}
                        onClick={onClickApprove}>
                        Approve
                    </button>
                    <button className={`py-2 px-6 text-lg bg-red-600 border-2 font-semibold border-red-600 rounded-2xl text-white  transition-all ease-linear  duration-200
                     ${modalState["taskApproved"] === "yes" ? disabledButton : modalState["taskApproved"] === "no" ? disabledButton : " hover:bg-white hover:text-red-600 hover:border-red-600"}`}
                        onClick={onClickReject}>
                        Reject
                    </button>
                </div>


            </div>
        </div>
    )
}

const CustomInputDatePicker = ({ value, onClick }) => {

    return (
        <div className="flex items-center gap-2 " >
            <input type="text" value={value} onClick={onClick} readOnly className="py-2 px-1  border-2" />
            <div className="bg-white cursor-pointer text-blue-500 p-2 transition-all ease-linear duration-200 hover:bg-blue-500 rounded-md border-blue-500 border-2 hover:text-white shadow-lg">
                <FaCalendarAlt size={24} />
            </div>
        </div>
    )
}

export { TaskModal }