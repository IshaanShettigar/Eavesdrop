import React, { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";


const Calendar = () => {


    const [tasks, setTasks] = useState([])
    const [spin, setSpin] = useState(true);

    useEffect(() => {
        const url = "http://localhost:5000/api/tasks/kanban"

        const fetchTaskData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setSpin(false)

                json.data = json.data.map((task) => {
                    task.taskDeadline = new Date(task.taskDeadline.split('T')[0])
                    task.taskStartTime = new Date(task.taskStartTime.split('T')[0])
                    return task;
                })
                setTasks(json.data);
            }
            catch (error) {
                console.log("error", error);
            }
        }
        fetchTaskData()


        /* Temporarily restricting it to December Month only, therefore the state depends only on the data and not month     */
    }, [])


    return (
        <div className="mx-auto mt-10">
            <div className="wrapper bg-white rounded shadow w-full ">
                <div className="header flex justify-between border-b p-2">
                    <span className="text-lg font-bold">
                        2023 December
                    </span>
                    <div className="buttons">
                        <button className="p-1">
                            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
                            </svg>
                        </button>
                        <button className="p-1">
                            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                                <path fillRule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr>
                            <DayHeading bigLabel="Monday" smallLabel="Mon" />
                            <DayHeading bigLabel="Tuesday" smallLabel="Tue" />
                            <DayHeading bigLabel="Wednesday" smallLabel="Wed" />
                            <DayHeading bigLabel="Thursday" smallLabel="Thu" />
                            <DayHeading bigLabel="Friday" smallLabel="Fri" />
                            <DayHeading bigLabel="Saturday" smallLabel="Sat" />
                            <DayHeading bigLabel="Sunday" smallLabel="Sun" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center h-20">
                            <DayCard dayNumber={1} tasks={tasks}>
                                {/* This will be the rendered children children[0] children[1] */}
                                <Event displayText="#1 Kelsa" />
                                <Event displayText="#4 CR7 is best" />
                                <Event displayText="#4 CR7 is best" />
                                <Event displayText="#4 CR7 is best" />

                            </DayCard>
                            <DayCard dayNumber={2} tasks={tasks}>
                                {/* <Event displayText="#6 Jon Bones Jones" color="bg-rose-500/[.50]" /> */}
                                <Event displayText="#4 CR7 is best" />
                            </DayCard>
                            <DayCard dayNumber={3} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={4} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={5} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={6} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={7} tasks={tasks}>
                            </DayCard>
                        </tr>

                        <tr className="text-center h-20">
                            <DayCard dayNumber={8} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={9} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={10} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={11} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={12} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={13} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={14} tasks={tasks}>
                            </DayCard>
                        </tr>


                        <tr className="text-center h-20">
                            <DayCard dayNumber={15} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={16} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={17} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={18} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={19} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={20} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={21} tasks={tasks}>
                            </DayCard>

                        </tr>


                        <tr className="text-center h-20">
                            <DayCard dayNumber={22} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={23} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={24} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={25} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={26} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={27} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={28} tasks={tasks}>
                            </DayCard>
                        </tr>


                        <tr className="text-center h-20">
                            <DayCard dayNumber={29} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={30} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={31} tasks={tasks}>
                            </DayCard>
                            <DayCard dayNumber={1} isDisabled tasks={[]}>
                            </DayCard>
                            <DayCard dayNumber={2} isDisabled tasks={[]}>
                            </DayCard>
                            <DayCard dayNumber={3} isDisabled tasks={[]}>
                            </DayCard>
                            <DayCard dayNumber={4} isDisabled tasks={[]}>
                            </DayCard>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DayHeading = ({ bigLabel, smallLabel }) => {
    return (
        <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
            <span className="xl:block lg:block md:block sm:block hidden">{bigLabel}</span>
            <span className="xl:hidden lg:hidden md:hidden sm:hidden block">{smallLabel}</span>
        </th>
    )
}

const Event = ({ displayText, bgColor = "bg-purple-600", textColor = "text-purple-600" }) => {
    return (
        <div className={`event ${bgColor} bg-opacity-30 ${textColor}  transition-none duration-0 rounded p-1 text-sm mb-1`}>
            <span className="event-name font-semibold">
                {displayText}
            </span>
        </div>
    )
}

const DayCard = ({ dayNumber, children, isDisabled = false, className = "", tasks }) => {
    const eventcolors = {
        "1": {
            "bgColor": "bg-purple-600",
            "textColor": "text-purple-600"
        },
        "2": {
            "bgColor": "bg-blue-600",
            "textColor": "text-blue-600"
        },
        "3": {
            "bgColor": "bg-teal-600",
            "textColor": "text-teal-600"
        },
        "4": {
            "bgColor": "bg-yellow-600",
            "textColor": "text-yellow-600"
        },
        "5": {
            "bgColor": "bg-pink-600",
            "textColor": "text-pink-600"
        },
        "6": {
            "bgColor": "bg-fuchsia-600",
            "textColor": "text-fuchsia-600"
        },
        "7": {
            "bgColor": "bg-indigo-600",
            "textColor": "text-indigo-600"
        },
        "8": {
            "bgColor": "bg-orange-600",
            "textColor": "text-orange-600"
        },
        "9": {
            "bgColor": "bg-cyan-600",
            "textColor": "text-cyan-600"
        },
    }
    return (
        <td className={`border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition  duration-300 ease
         ${isDisabled ? "bg-gray-100" : "cursor-pointer  hover:bg-stone-100"}
         ${className}`}>
            <div className="flex flex-col h-40  xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden ">
                <div className="top h-5 w-full">
                    <span className="text-gray-500">{dayNumber}</span>
                </div>
                <div className="flex-grow h-30 py-1 w-full "> {/* Removed grid grid-cols-1 grid-rows-5 gap-0 */}
                    {
                        tasks.map((task, index) => {

                            if (dayNumber <= task.taskDeadline.getDate() && dayNumber >= task.taskStartTime.getDate()) {
                                console.log()

                                return (
                                    <div key={index}>
                                        <Event displayText={`${task.taskID} ${task.taskName.slice(0, 10)}...`} bgColor={`${eventcolors[task.taskID]['bgColor']}`} textColor={`${eventcolors[task.taskID]['textColor']}`} />
                                    </div>)
                            }
                            else {

                            }
                        })
                    }
                </div>
            </div>
        </td>
    )
}

export default Calendar;