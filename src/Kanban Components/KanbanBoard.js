import React, { useState, useEffect, createContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { KanbanModal } from "./KanbanModal";
import { ImSpinner6 } from "react-icons/im";

const kanbanModalContext = createContext(null)

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [reviewed, setReviewed] = useState([]);

    const [spin, setSpin] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalState, setModalState] = useState({
        "taskID": "", "taskName": "", "taskDescription": "", "taskPriority": "", "taskDeadline": new Date()
    })

    const onCardClick = (taskID, taskName, taskDescription, taskPriority, taskDeadline) => {
        setModalState({
            "taskID": taskID,
            "taskName": taskName,
            "taskDescription": taskDescription,
            "taskPriority": taskPriority,
            "taskDeadline": taskDeadline,
        })
        setIsModalOpen(true)
    }


    useEffect(() => {
        // const json = [
        //     {
        //         "taskName": "Create another sheet that has cost summaries for all components/connectors",
        //         "taskDescription": "In the last call the stakeholders stressed on the importance of having another sheet where the costs are displayed. ",
        //         "taskPriority": "High",
        //         "taskID": "1",
        //         "taskDeadline": new Date(),
        //         "taskApproved": "not-yet",
        //         "taskCompleted": false,
        //         "taskReviewed": false
        //     },
        //     {
        //         "taskName": "[BUG] Sidebar tooltip is being displayed below (Z) tasks",
        //         "taskDescription": "Tooltip in the sidebar is being displayed in the lower z-index. Correcting the z-index also doesn't fix this. Please look into this issue",
        //         "taskPriority": "Medium",
        //         "taskID": "2",
        //         "taskDeadline": new Date(),
        //         "taskApproved": "no",
        //         "taskCompleted": false,
        //         "taskReviewed": false
        //     },
        //     {
        //         "taskName": "Fix the hover modal position when modal is out of bounds for PLET and UTH",
        //         "taskDescription": "The hover modal is wildly out of position due to the fact that we are defining the distance of the modal from the hovered coordinates in terms of the elements height (in case of out of bounds on the Y axis) and width (in case of out of bounds on the X axis). This is an error simply due to the fact that these elements PLET and UTH have a much larger size. Not visually tho,\
        //         the elements bounding box is itself larger than the others.\nPossible solutions:\nRedefine/Re-draw them.\nFigure out a different way to display the out of bounds cases.",
        //         "taskPriority": "Low",
        //         "taskID": "3",
        //         "taskDeadline": new Date(),
        //         "taskApproved": "yes",
        //         "taskCompleted": false,
        //         "taskReviewed": false
        //     },
        //     {
        //         "taskName": "When refreshing the page or opening a diagram that you just saved, the linsk dont show up cause of some error",
        //         "taskDescription": "When refreshing the page or saving and loading a diagram, the link color disappears. This is cause something weird happens when it saves it, I do not know what. Look at localstorage under the links attrs. Something weird is happeniing",
        //         "taskPriority": "Low",
        //         "taskID": "4",
        //         "taskDeadline": new Date(),
        //         "taskApproved": "no",
        //         "taskCompleted": false,
        //         "taskReviewed": false
        //     }
        // ]
        const url = "http://localhost:5000/api/tasks/kanban"
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setSpin(false)
                // setJson(json.data);
                // completed and not reviewed
                setCompleted(json.data.filter((task) => task.taskCompleted && !task.taskReviewed));
                setReviewed(json.data.filter((task) => task.taskReviewed && task.taskCompleted));
                setIncomplete(json.data.filter((task) => !task.taskCompleted && !task.taskReviewed));
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchTaskData();
        /** Sample JSON Format
         * {
            "_id": "65828c97e7b9cf451bbb9663",
            "taskID": "1",
            "taskName": "Create another sheet that has cost summaries for all components/connectors",
            "taskDescription": "In the last call the stakeholders stressed on the importance of having another sheet where the costs are displayed. ",
            "taskPriority": "High",
            "taskDeadline": "2023-12-20T06:41:21.795Z",
            "taskApproved": "yes",
            "taskCompleted": true,
            "taskReviewed": true,
            "__v": 0
        },
         */


    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        const url = "http://localhost:5000/api/tasks/kanban/"
        console.log(draggableId)
        if (source.droppableId == destination.droppableId) return;


        //REMOVE FROM SOURCE ARRAY
        if (source.droppableId == 4) {
            setReviewed(removeItemById(draggableId, reviewed));
            setCompleted(removeItemById(draggableId, completed))
        } else if (source.droppableId == 2) {
            setCompleted(removeItemById(draggableId, completed));
        } else {
            setIncomplete(removeItemById(draggableId, incomplete));
        }

        // GET ITEM

        const task = findItemById(draggableId, [...incomplete, ...completed, ...reviewed]);

        //ADD ITEM
        if (destination.droppableId == 4) {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "taskCompleted": "true",
                    "taskReviewed": "true"
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            fetch(url + draggableId, options).then((response) => response.json()).then((data) => { console.log(data.msg) })
            setReviewed([{ ...task, reviewed: !task.reviewed }, ...reviewed]);
        } else if (destination.droppableId == 2) {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "taskCompleted": "true",
                    "taskReviewed": "false"
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            fetch(url + draggableId, options).then((response) => response.json()).then((data) => { console.log(data.msg) })
            setCompleted([{ ...task, completed: !task.completed }, ...completed]);
        } else {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    "taskCompleted": "false",
                    "taskReviewed": "false"
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }

            fetch(url + draggableId, options).then((response) => response.json()).then((data) => { console.log(data.msg) })
            setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
        }
    };

    function findItemById(id, array) {
        return array.find((item) => item.taskID == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.taskID != id);
    }

    return (
        <kanbanModalContext.Provider value={{ modalState, setModalState }}>
            <div className="flex flex-col items-center justify-center mt-5">
                {/* <div className="mx-auto"> */}
                <h2 className="font-semibold  text-4xl text-blue-500 " >Kanban Board</h2>
                {/* </div> */}

                <DragDropContext onDragEnd={handleDragEnd}>

                    <div className="grid grid-cols-4 gap-6 ml-24 mr-8 my-8">
                        <Column title={"To Do"} tasks={incomplete} id={"1"} onClick={onCardClick} />
                        <Column title={"Done"} tasks={completed} id={"2"} onClick={onCardClick} />
                        <Column title={"Backlog"} tasks={[]} id={"3"} onClick={onCardClick} />
                        <Column title={"Reviewed"} tasks={reviewed} id={"4"} onClick={onCardClick} />
                    </div>
                </DragDropContext>
                <KanbanModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <div className={`fixed top-[45vh] left-[50vw] text-blue-500 animate-spin ${spin ? "opacity-100" : "opacity-0"}`}>
                    <ImSpinner6 size={100} />
                </div>
            </div>
        </kanbanModalContext.Provider>
    );
}

export { kanbanModalContext }