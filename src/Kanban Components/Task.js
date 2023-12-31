import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { BsFillPersonFill } from "react-icons/bs";


// const Container = styled.div`
//   min-height: 90px;
//   background-color: ${(props) => bgcolorChange(props)};
// `;


function bgcolorChange(props) {
    return props.isDragging
        ? "lightgreen"
        : props.isDraggable
            ? props.isBacklog
                ? "#F2D7D5"
                : "#DCDCDC"
            : props.isBacklog
                ? "#F2D7D5"
                : "#EAF4FC";
}

export default function Task({ task, index, title, onClick }) {
    return (
        <Draggable draggableId={`${task.taskID}`} key={task.taskID} index={index}>
            {(provided, snapshot) => (
                <div className={`rounded-lg shadow-lg p-2 border-2 border-white text-black mx-4 my-4 flex justify-between 
                flex-col cursor-pointer bg-gray-50 hover:scale-105 transition-all duration-200
                hover:${title === "To Do" ? "border-red-300" : title === "Done" ? "border-green-300" : title === "Reviewed" ? "border-yellow-300" : "border-blue-300"}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => onClick(task["taskID"], task["taskName"], task["taskDescription"], task["taskPriority"], task["taskDeadline"])}
                // isDragging={snapshot.isDragging}
                >
                    <div className="flex justify-start p-1" >
                        <span>
                            <small>
                                #{task.taskID}
                                {"  "}
                            </small>
                        </span>
                    </div>
                    <div className="flex justify-center p-1">
                        <div>{task.taskName}</div>
                    </div>
                    <div className="flex justify-end p-1">
                        <div className="p-2 text-blue-500 bg-white shadow-sm shadow-blue-300 rounded-2xl">
                            <BsFillPersonFill
                                onClick={() => console.log(task)}
                            />
                        </div>
                    </div>
                    {provided.placeholder}
                </div>
            )
            }
        </Draggable >
    );
}