import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = ({ searchTerm, setSearchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(localSearchTerm.trim());
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Bolttedex</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={localSearchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
