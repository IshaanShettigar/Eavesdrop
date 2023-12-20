import React, { useState, useEffect, createContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { KanbanModal } from "./KanbanModal";

const kanbanModalContext = createContext(null)

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [reviewed, setReviewed] = useState([]);

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
        const jsonTest = [
            {
                "userId": 1,
                "taskID": 1,
                "task": "Define project objectives and scope: Clearly outline what the project aims to achieve and what is included within its boundaries",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 2,
                "id": 2,
                "title": "Create a project plan: Develop a detailed plan that outlines tasks, timelines, and resource requirements",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 3,
                "id": 3,
                "title": "Identify stakeholders: List all individuals or groups with an interest in the project's outcome and establish communication channels with them.",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 4,
                "id": 4,
                "title": "Gather resources: Secure the necessary materials, equipment, and team members required for the project",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 5,
                "id": 5,
                "title": "Develop a project schedule: Create a timeline that includes milestones and deadlines for each task",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 1,
                "id": 6,
                "title": "Assign responsibilities: Allocate specific tasks to team members and designate a project manager if necessary",
                "completed": true,
                "reviewed": false
            },
            {
                "userId": 2,
                "id": 7,
                "title": "Conduct a risk assessment: Identify potential risks and develop a risk management plan",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 3,
                "id": 8,
                "title": "Define success criteria: Determine how you will measure the project's success and what the deliverables should look like",
                "completed": true,
                "reviewed": true
            },
            {
                "userId": 4,
                "id": 9,
                "title": "Conduct research and gather data: Collect relevant information and data needed for the project.",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 5,
                "id": 10,
                "title": "Design and planning: Create detailed plans or blueprints for the project's deliverables",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 1,
                "id": 11,
                "title": "Procure materials and resources: Purchase or secure the necessary materials and resources according to the plan",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 2,
                "id": 12,
                "title": "Build or create: Execute the project tasks, following the project plan and design",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 3,
                "id": 13,
                "title": "Monitor progress: Continuously track the project's status, making adjustments as needed",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 4,
                "id": 14,
                "title": "Quality control and testing: Ensure that project components meet quality standards and conduct testing as required",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 5,
                "id": 15,
                "title": "Communicate with stakeholders: Keep all relevant parties informed about the project's progress.",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 1,
                "id": 16,
                "title": "Handle change requests: Address any changes or modifications to the project scope and plan",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 2,
                "id": 17,
                "title": "Review and document: Create documentation of the project's processes and outcomes",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 3,
                "id": 18,
                "title": "Finalize deliverables: Complete all project components and ensure they meet the defined criteria",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 4,
                "id": 19,
                "title": "Review and approve: Conduct a final review with stakeholders to gain their approval",
                "completed": false,
                "reviewed": false
            },
            {
                "userId": 5,
                "id": 20,
                "title": "Project closure: Officially close the project, hand over deliverables, and evaluate the project's performance.",
                "completed": true,
                "reviewed": true
            }
        ]
        const json = [
            {
                "taskName": "Create another sheet that has cost summaries for all components/connectors",
                "taskDescription": "In the last call the stakeholders stressed on the importance of having another sheet where the costs are displayed. ",
                "taskPriority": "High",
                "taskID": "1",
                "taskDeadline": new Date(),
                "taskApproved": "not-yet",
                "taskCompleted": false,
                "taskReviewed": false
            },
            {
                "taskName": "[BUG] Sidebar tooltip is being displayed below (Z) tasks",
                "taskDescription": "Tooltip in the sidebar is being displayed in the lower z-index. Correcting the z-index also doesn't fix this. Please look into this issue",
                "taskPriority": "Medium",
                "taskID": "2",
                "taskDeadline": new Date(),
                "taskApproved": "no",
                "taskCompleted": false,
                "taskReviewed": false
            },
            {
                "taskName": "Fix the hover modal position when modal is out of bounds for PLET and UTH",
                "taskDescription": "The hover modal is wildly out of position due to the fact that we are defining the distance of the modal from the hovered coordinates in terms of the elements height (in case of out of bounds on the Y axis) and width (in case of out of bounds on the X axis). This is an error simply due to the fact that these elements PLET and UTH have a much larger size. Not visually tho,\
                the elements bounding box is itself larger than the others.\nPossible solutions:\nRedefine/Re-draw them.\nFigure out a different way to display the out of bounds cases.",
                "taskPriority": "Low",
                "taskID": "3",
                "taskDeadline": new Date(),
                "taskApproved": "yes",
                "taskCompleted": false,
                "taskReviewed": false
            },
            {
                "taskName": "When refreshing the page or opening a diagram that you just saved, the linsk dont show up cause of some error",
                "taskDescription": "When refreshing the page or saving and loading a diagram, the link color disappears. This is cause something weird happens when it saves it, I do not know what. Look at localstorage under the links attrs. Something weird is happeniing",
                "taskPriority": "Low",
                "taskID": "4",
                "taskDeadline": new Date(),
                "taskApproved": "no",
                "taskCompleted": false,
                "taskReviewed": false
            }
        ]
        // const url = "http://localhost:5000/api/tasks/kanban"
        // const fetchTaskData = async () => {
        //     try {
        //         const response = await fetch(url);
        //         const json = await response.json();
        //         setSpin(false)
        //         setTasks(json.data);
        //     } catch (error) {
        //         console.log("error", error);
        //     }
        // };

        // fetchTaskData();
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
        // completed and not reviewed
        setCompleted(json.filter((task) => task.taskCompleted && !task.taskReviewed));
        setReviewed(json.filter((task) => task.taskReviewed && task.taskCompleted));
        setIncomplete(json.filter((task) => !task.taskCompleted && !task.taskReviewed));

    }, []);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

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
            setReviewed([{ ...task, reviewed: !task.reviewed }, ...reviewed]);
        } else if (destination.droppableId == 2) {
            setCompleted([{ ...task, completed: !task.completed }, ...completed]);
        } else {
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

            </div>
        </kanbanModalContext.Provider>
    );
}

export { kanbanModalContext }