import React, { useState, useEffect, Fragment } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [reviewed, setReviewed] = useState([]);

    useEffect(() => {
        const json = [
            {
                "userId": 1,
                "id": 1,
                "title": "Define project objectives and scope: Clearly outline what the project aims to achieve and what is included within its boundaries",
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
                "completed": false,
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
                "completed": false,
                "reviewed": true
            }
        ]
        setCompleted(json.filter((task) => task.completed));
        setReviewed(json.filter((task) => task.reviewed));
        setIncomplete(json.filter((task) => !task.completed));

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
        return array.find((item) => item.id == id);
    }

    function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
    }

    return (
        <div className="flex flex-col items-center justify-center mt-5">
            {/* <div className="mx-auto"> */}
            <h2 className="font-semibold  text-4xl text-blue-500 " >Kanban Board</h2>
            {/* </div> */}

            <DragDropContext onDragEnd={handleDragEnd}>

                <div className="grid grid-cols-4 gap-6 ml-24 mr-8 my-8">
                    <Column title={"To Do"} tasks={incomplete} id={"1"} />
                    <Column title={"Done"} tasks={completed} id={"2"} />
                    <Column title={"Backlog"} tasks={[]} id={"3"} />
                    <Column title={"Reviewed"} tasks={reviewed} id={"4"} />
                </div>
            </DragDropContext>
        </div>
    );
}