import { useState } from "react";
import utensils from "../assets/utensils.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Searchbar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="flex items-center gap-3 w-[90%] max-w-[900px] h-[30px] rounded-[40px] bg-[#FCFCFC] px-[25px] py-[18px] shadow-[0px_8px_15px_rgba(0,0,0,0.15)]">
            <FontAwesomeIcon
                icon={faSearch}
                className="text-[14px] text-[#777]"
            />

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search Restaurants on Campus"
                    value={query}
                    onChange={handleChange}
                    className="min-w-[210px] border-none bg-transparent text-[14px] text-[#777] placeholder:text-[#9a9a9a] focus:outline-none"/>

                <img
                    src={utensils}
                    alt="utensils"
                    className="h-[25px] w-[25px] object-contain"
                />
            </div>
        </div>
    );
}