import React, { useState } from "react";
import { AssigneeIcon } from "./Tasks";
import { BsFillPersonFill } from "react-icons/bs";
const AssigneeTabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(children[0]?.props?.label);

    const handleClick = (e, newActiveTab) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
    };

    return (
        <div className=" max-w-2xl mx-auto flex gap-1 ">
            <div className="flex flex-col border-r border-gray-300">
                {children.map(child => (
                    <button
                        key={child.props.label}
                        className={`transition-colors duration-200 cursor-pointer ${activeTab === child.props.label ? 'border-r-2 border-stone-600 bg-stone-200' : ''}
                         flex-1 text-gray-700 font-medium py-2 flex flex-col justify-center items-center px-2`}
                        onClick={e => handleClick(e, child.props.label)}
                    >
                        {child.props.icon}
                        <span className="">
                            {child.props.label}
                        </span>
                    </button>
                ))}
            </div>


            <div className="py-4">
                {children.map(child => {
                    if (child.props.label === activeTab) {
                        return <div key={child.props.label}>{child.props.children}</div>;
                    }
                    return null;
                })}
            </div>
        </div>
    )
}


const AssigneeTab = ({ label, children }) => {
    return (
        <div label={label} className="hidden">
            {children}
        </div>
    );
}

export { AssigneeTabs, AssigneeTab }