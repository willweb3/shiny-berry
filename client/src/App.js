import React, { useState } from "react";
import PokemonList from "./components/PokemonList";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PokemonList
        isDarkMode={isDarkMode}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="floating-buttons-container">
        <button
          className={`floating-dark-mode-btn ${isDarkMode ? "dark-mode" : ""}`}
          onClick={toggleDarkMode}
          title="Toggle Dark Mode"
        >
          {isDarkMode ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="currentColor"
                stroke-width="2"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3a9 9 0 0 0 9 9c0 4.97-4.03 9-9 9A9 9 0 0 1 3 12c0-4.97 4.03-9 9-9z"
                fill="currentColor"
              />
              <path
                d="M12 3a9 9 0 0 1 0 18c4.97 0 9-4.03 9-9a9 9 0 0 0-9-9z"
                fill="#fff"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
