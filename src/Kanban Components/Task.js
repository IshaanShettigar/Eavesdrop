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

export default function Task({ task, index }) {
    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
                <div className="rounded-lg shadow-lg p-2 border-2 border-white text-black mx-4 my-4 flex justify-between 
                flex-col cursor-pointer bg-gray-50 hover:scale-105 hover:border-blue-500  transition-all duration-200"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                // isDragging={snapshot.isDragging}
                >
                    <div className="flex justify-start p-1" >
                        <span>
                            <small>
                                #{task.id}
                                {"  "}
                            </small>
                        </span>
                    </div>
                    <div className="flex justify-center p-1">
                        <div>{task.title}</div>
                    </div>
                    <div className="flex justify-end p-1">
                        <div className="p-2 text-blue-500 bg-white shadow-lg rounded-2xl">
                            <BsFillPersonFill
                                onClick={() => console.log(task)}
                            />
                        </div>
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Draggable>
    );
}