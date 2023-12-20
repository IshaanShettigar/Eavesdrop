import React from "react";
import Task from "./Task";
import { StrictModeDroppable } from "./CustomDroppable";
import { Droppable } from "react-beautiful-dnd";

/* ISSUE 1: Add min height 100px to div inside with flex-grow */
export default function Column({ title, tasks, id, onClick }) {

    return (
        <div className="bg-slate-100 rounded-md w-[21rem] h-fit overflow-scroll top-0 border border-gray-400 
        no-scrollbar  max-h-[40em]">
            <h3 className="sticky shadow-lg p-2 bg-blue-500 text-center font-semibold text-lg text-white">
                {title}
            </h3>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (

                    <div className="flex-grow p-1 transition-colors duration-200 ease-linear "
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    // isDraggingOver={snapshot.isDraggingOver}
                    >
                        {tasks.map((task, index) => (
                            <Task key={index} index={index} task={task} title={title} onClick={onClick} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}