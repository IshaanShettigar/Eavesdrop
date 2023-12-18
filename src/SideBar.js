import { FaTasks, FaCalendar } from "react-icons/fa";
import { IoAnalytics } from "react-icons/io5";
import { MdOutlineViewKanban } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";

import { useState } from "react";

const SideBar = () => {
    const [activeIcon, setActiveIcon] = useState(null);
    const navigate = useNavigate()

    const handleIconClick = (iconName, route) => {
        setActiveIcon(iconName)
        navigate(route)
    }

    return (
        <div className="fixed top-0 left-0 flex flex-col h-screen w-16 bg-slate-200 text-blue-500 shadow-2xl pt-5">
            <SideBarIcon icon={<FaTasks size={24} />} onClick={() => handleIconClick("tasks", "tasks")} isActive={activeIcon === "tasks"} text="Incoming Tasks" />
            <SideBarIcon icon={<IoAnalytics size={28} />} onClick={() => handleIconClick("analytics", "analytics")} isActive={activeIcon === "analytics"} text="Analytics" />
            <SideBarIcon icon={<FaCalendar size={23} />} onClick={() => handleIconClick("calendar", "calendar")} isActive={activeIcon === "calendar"} text="Calendar" />
            <SideBarIcon icon={<MdOutlineViewKanban size={28} />} onClick={() => handleIconClick("kanban", "kanban")} isActive={activeIcon === "kanban"} text="Kanban" />
        </div>
    )
}


const SideBarIcon = ({ icon, onClick, isActive, text = "tooltip" }) => {
    return (
        <div className={`sidebar-icon group ${isActive ? "active" : ""}`} onClick={onClick}>
            {icon}

            <span className="sidebar-tooltip group-hover:scale-100">
                {text}
            </span>
        </div>
    )
}
export default SideBar;