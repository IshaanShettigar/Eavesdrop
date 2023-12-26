import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const AIButton = () => {
    return (
        <div className=" fixed z-10 left-[95vw] top-[90vh] bg-indigo-600 border-2 border-indigo-600 text-white hover:text-indigo-500 hover:bg-white 
        transition-all duration-150 p-2 rounded-2xl cursor-pointer hover:scale-105 shadow-lg">
            <FaRobot size={35} />
        </div>
    )
}

export { AIButton }