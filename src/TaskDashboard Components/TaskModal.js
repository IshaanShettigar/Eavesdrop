import React, { useContext, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { taskContext } from "./Tasks";
import { FaCalendarAlt, FaPaintRoller } from "react-icons/fa";
import { FaShieldVirus, FaServer, FaRobot, FaCheck } from "react-icons/fa6";
import { RiBardFill } from "react-icons/ri";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AssigneeTab, AssigneeTabs } from "./AssigneeTabs";


const TaskModal = ({ open = false, onClose }) => {

    const { modalState, setModalState } = useContext(taskContext);
    const [empState, setEmpState] = useState([])
    const [checked, setChecked] = useState(Array.from({ length: 28 }).fill(false))
    const [AIRidgeRegressionOutput, setAIRidgeRegressionOutput] = useState("")
    const disabledButton = "opacity-50 cursor-not-allowed";

    const url = "http://localhost:5000/api/tasks/"
    const url2 = "http://localhost:5000/api/employee/"
    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url2);
                let json = await response.json();
                console.log(json.data)
                setEmpState(json.data)

            } catch (error) {
                console.log("error", error);
            }

        };

        fetchTaskData();
        console.log(checked)
    }, [])

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

            setModalState({ ...modalState, "taskApproved": "no" })
            // onClose()
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

            setModalState({ ...modalState, "taskApproved": "yes", })
            // onClose()
        }

    }
    const handleCheckboxChange = (event) => {
        // Check if the checkbox is checked
        console.log(event);
        if (event.target.checked) {
            // Access the value of the select box and print it
            let arr = modalState["taskAssignees"].split(',');
            arr = arr.filter((ele) => {
                if (ele !== "") {
                    return ele;
                }
            })
            console.log("Before", arr)
            arr.push(event.target.value)
            console.log("After", arr.toString() + ",")
            setModalState({ ...modalState, "taskAssignees": arr.toString() + "," })
            // console.log({ ...modalState, "taskAssignees": modalState["taskAssignees"] + event.target.value + "," });
        }
        else if (!event.target.checked) {
            let arr = modalState["taskAssignees"].split(',');
            arr = arr.filter((ele) => {
                if (ele !== "") {
                    return ele;
                }
            })
            console.log("Before", arr)
            arr = arr.filter((ele) => ele != event.target.value);
            console.log("After", arr.toString() + ",")
            setModalState({ ...modalState, "taskAssignees": arr.toString() + "," })
        }
    };

    useEffect(() => {
        const newChecked = [...checked]
        let arr = modalState["taskAssignees"].split(',');
        arr = arr.filter((ele) => {
            if (ele !== "") {
                return ele;
            }
        })

        arr.forEach((ele) => {
            newChecked[Number(ele)] = true;
        })
        setChecked(newChecked)

        /* Resetting the AI regression output */
        setAIRidgeRegressionOutput("")
    }, [modalState])

    const triggerRidgeRegress = async () => {
        let arr = modalState["taskAssignees"].split(',');
        arr = arr.filter((ele) => {
            if (ele !== "") {
                return ele;
            }
        })

        let values = [0, 0, 0, 0, 0]   // to send to backend
        if (modalState['taskPriority'] === "High") { values[4] = 2 }
        if (modalState['taskPriority'] === "Medium") { values[4] = 1 }
        if (modalState['taskPriority'] === "Low") { values[4] = 0 }
        empState.forEach((emp) => {
            arr.filter((ele) => {
                if (ele == emp.employeeID) {
                    if (emp.employeeDepartment === "Frontend") {
                        values[0] += 1
                    }
                    if (emp.employeeDepartment === "Backend") {
                        values[1] += 1
                    }
                    if (emp.employeeDepartment === "QA") {
                        values[2] += 1
                    } if (emp.employeeDepartment === "MLOps") {
                        values[3] += 1
                    }
                }
            })
        })
        console.log(values)

        // Run a post request and display the response
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "values": values
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }

        const pythonServerURL = "http://localhost:8000/prediction/"
        const response = await fetch(pythonServerURL, options);
        let json = await response.json();
        console.log("AI Predicted: ", json.prediction)
        setAIRidgeRegressionOutput(json.prediction)
    }

    let AIRecommendedAssignees = `AI Recommended: ${modalState["taskFrontend"] != "0" ? `Fronted-${modalState.taskFrontend}` : ""}`;
    AIRecommendedAssignees += ` ${modalState.taskBackend != "0" ? `Backend-${modalState.taskBackend}` : ''}`
    AIRecommendedAssignees += ` ${modalState.taskQA != "0" ? `QA-${modalState.taskQA}` : ''}`
    AIRecommendedAssignees += ` ${modalState.taskMLOps != "0" ? `MLOps-${modalState.taskMLOps}` : ''}`
    console.log(modalState);
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-colors
                        ${open ? "visible bg-black/40 backdrop-blur-sm" : "invisible"}`}>
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"} w-1/2 h-3/4 overflow-auto`}>
                <button onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <IoCloseSharp size={28} />
                </button>


                <label className="font-bold text-lg block ">Task Name</label>
                <input type="text" value={modalState["taskName"]} onChange={(e) => setModalState({ ...modalState, "taskName": e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 my-2" />

                <label className="font-bold text-lg block mt-4">Task Description</label>
                <textarea value={modalState["taskDescription"]} onChange={(e) => setModalState({ ...modalState, "taskDescription": e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mt-2 mb-6 h-auto" />

                <div className="flex gap-5 items-center">
                    <label className="block font-bold text-lg ">
                        Assignees:
                    </label>
                    <div className="bg-violet-200 text-violet-500 rounded-lg flex gap-2 items-center py-1 border-2 border-violet-500 px-2">
                        <label className="block font-semibold text-md">
                            AI Recommended:
                        </label>
                        <label className="block text-md">
                            {AIRecommendedAssignees}

                        </label>
                    </div>
                </div>

                <div className="flex gap-4 items-center text-gray-800 text-sm">
                    <div className="flex gap-2">
                        <AssigneeTabs>
                            <AssigneeTab label={"Frontend"} icon={<FaPaintRoller size={18} />}>
                                <table className="w-full table-auto ml-3">
                                    <thead className="font-bold border-2">
                                        <tr className="text-center" >
                                            <td><FaCheck size={15} /></td>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Experience</td>
                                            <td>Role</td>
                                            <td>Skills</td>
                                        </tr>
                                    </thead>
                                    <tbody className=" border-y-2 border-x">
                                        {empState.map((emp) => {
                                            if (emp.employeeDepartment == "Frontend") {
                                                return (
                                                    <tr className="text-center">
                                                        <td className="border">
                                                            <input type="checkbox" value={emp.employeeID} onChange={handleCheckboxChange} checked={checked[emp.employeeID]} />
                                                        </td>
                                                        <td className="border">{emp.employeeID}</td>
                                                        <td className="border">{emp.employeeName}</td>
                                                        <td className="border">{emp.employeeExp}</td>
                                                        <td className="border">{emp.employeeRole}</td>
                                                        <td className="border">{emp.employeeSkillSet}</td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </AssigneeTab>
                            <AssigneeTab label={"Backend"} icon={<FaServer size={18} />}>
                                <table className="w-full table-auto ml-3">
                                    <thead className="font-bold border-2">
                                        <tr className="text-center" >
                                            <td><FaCheck size={15} /></td>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Experience</td>
                                            <td>Role</td>
                                            <td>Skills</td>
                                        </tr>
                                    </thead>
                                    <tbody className=" border-y-2 border-x">
                                        {empState.map((emp) => {
                                            if (emp.employeeDepartment == "Backend") {
                                                return (
                                                    <tr className="text-center">
                                                        <td className="border">
                                                            <input type="checkbox" value={emp.employeeID} onChange={handleCheckboxChange} checked={checked[emp.employeeID]} />
                                                        </td>
                                                        <td className="border">{emp.employeeID}</td>
                                                        <td className="border">{emp.employeeName}</td>
                                                        <td className="border">{emp.employeeExp}</td>
                                                        <td className="border">{emp.employeeRole}</td>
                                                        <td className="border">{emp.employeeSkillSet}</td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </AssigneeTab>
                            <AssigneeTab label={"MLOps"} icon={<FaRobot size={18} />}>
                                <table className="w-full table-auto ml-3">
                                    <thead className="font-bold border-2">
                                        <tr className="text-center" >
                                            <td><FaCheck size={15} /></td>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Experience</td>
                                            <td>Role</td>
                                            <td>Skills</td>
                                        </tr>
                                    </thead>
                                    <tbody className=" border-y-2 border-x">
                                        {empState.map((emp) => {
                                            if (emp.employeeDepartment == "MLOps") {
                                                return (
                                                    <tr className="text-center">
                                                        <td className="border">
                                                            <input type="checkbox" value={emp.employeeID} onChange={handleCheckboxChange} checked={checked[emp.employeeID]} />
                                                        </td>
                                                        <td className="border">{emp.employeeID}</td>
                                                        <td className="border">{emp.employeeName}</td>
                                                        <td className="border">{emp.employeeExp}</td>
                                                        <td className="border">{emp.employeeRole}</td>
                                                        <td className="border">{emp.employeeSkillSet}</td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </AssigneeTab>
                            <AssigneeTab label={"QA"} icon={<FaShieldVirus size={18} />}>
                                <table className="w-full table-auto ml-3">
                                    <thead className="font-bold border-2">
                                        <tr className="text-center" >
                                            <td><FaCheck size={15} /></td>
                                            <td>ID</td>
                                            <td>Name</td>
                                            <td>Experience</td>
                                            <td>Role</td>
                                            <td>Skills</td>
                                        </tr>
                                    </thead>
                                    <tbody className=" border-y-2 border-x">
                                        {empState.map((emp) => {
                                            if (emp.employeeDepartment == "QA") {
                                                return (
                                                    <tr className="text-center">
                                                        <td className="border">
                                                            <input type="checkbox" value={emp.employeeID} onChange={handleCheckboxChange} checked={checked[emp.employeeID]} />
                                                        </td>
                                                        <td className="border">{emp.employeeID}</td>
                                                        <td className="border">{emp.employeeName}</td>
                                                        <td className="border">{emp.employeeExp}</td>
                                                        <td className="border">{emp.employeeRole}</td>
                                                        <td className="border">{emp.employeeSkillSet}</td>
                                                    </tr>
                                                )
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </AssigneeTab>
                        </AssigneeTabs>
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

                <div className="flex items-center gap-6 my-4">
                    <label className="font-bold text-lg">Deadline:  </label>
                    <label>
                        <DatePicker dateFormat="dd/MM/yyyy" selected={modalState["taskDeadline"]} onChange={(date) => setModalState({ ...modalState, "taskDeadline": date })}
                            customInput={<CustomInputDatePicker />} />
                    </label>
                    <div onClick={triggerRidgeRegress}
                        className="rounded-md border-2 bg-violet-200 text-violet-500 p-2 border-violet-500 hover:bg-violet-300/[0.8] cursor-pointer transition-colors">
                        <RiBardFill size={24} />
                    </div>
                </div>

                <div className={`bg-violet-200 text-violet-500 rounded-lg flex gap-2 items-center py-1 border-2 border-violet-500 px-2
            ${AIRidgeRegressionOutput == "" ? 'opacity-0' : 'opacity-100'}`}>
                    <label className="block font-semibold text-md">
                        AI Recommended:
                    </label>
                    <label className="block text-md">
                        {AIRidgeRegressionOutput} days to complete task
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