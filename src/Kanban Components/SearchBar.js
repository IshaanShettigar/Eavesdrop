import React, { useState, useEffect, createContext } from "react";
import { FaMicrophone, FaSearch } from "react-icons/fa";
const SearchBar = () => {
    const [query, setQuery] = useState("")
    useEffect(() => {
        const keyDownHandler = event => {
            console.log('User pressed: ', event.key);

            if (event.key === 'Enter') {
                event.preventDefault();

                // 👇️ your logic here
                handleQuery()
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [])

    const handleQuery = () => {
        console.log("Sending to LLM...", query);
    }

    const speechToText = () => {
        console.log("Coming soon...");
    }

    return (
        <div className="relative">
            <div className="text-gray-400 absolute top-[0.92rem] left-3 hover:cursor-pointer hover:text-blue-400" onClick={handleQuery}>
                <FaSearch size={20} />
            </div>
            <input type="text" placeholder="Enter a query" value={query} onChange={(e) => setQuery(e.target.value)}
                className="bg-white h-12 w-full px-12 rounded-lg focus:outline-blue-400 hover:cursor-pointer outline-gray-200 outline-2 outline" />
            <span className="absolute top-4 right-5 border-l pl-4 text-gray-400 hover:text-blue-400 hover:cursor-pointer" onClick={speechToText}>
                <FaMicrophone size={20} />
            </span>
        </div>
    )
}


export { SearchBar }