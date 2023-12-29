import React, { useState, useEffect, useRef } from "react";
import { FaRobot } from "react-icons/fa";
import { RiBardFill } from "react-icons/ri";

const AIButton = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState("")
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <QueryKanbanModal show={isOpen} onClose={closeModal}>
                <div className="w-1/3">
                    <label className="font-semibold">Enter your query</label>
                    <input className="p-2 rounded-lg border-2 border-indigo-400" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <button className="rounded-md border-2 bg-violet-200 text-violet-500 p-2 border-violet-500 hover:bg-violet-300/[0.8] cursor-pointer transition-colors">
                        <RiBardFill size={24} />
                    </button>
                </div>
            </QueryKanbanModal>
            <div className=" fixed z-10 left-[95vw] top-[90vh] bg-indigo-600 border-2 border-indigo-600 text-white hover:text-indigo-500 hover:bg-white 
        transition-all duration-150 p-2 rounded-2xl cursor-pointer hover:scale-105 shadow-lg" onClick={() => openModal()}>
                <FaRobot size={35} />
            </div>
        </div>
    )
}


const QueryKanbanModal = ({ children, show, onClose }) => {
    const [isOpen, setIsOpen] = useState(show);
    const modalRef = useRef(null);

    const handleClose = () => {
        setIsOpen(false);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            modalRef.current.showModal();
        } else {
            modalRef.current.close();
        }
    }, [isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            {children}
            <button onClick={handleClose}>Close</button>
        </dialog>
    );
};


export { AIButton }