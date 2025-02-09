import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={query}
            onChange={handleInputChange}
        />
    );
}

export default SearchBar;
