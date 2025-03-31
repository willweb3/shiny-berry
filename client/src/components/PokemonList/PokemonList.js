import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./PokemonList.css";
import PokemonCard from "../PokemonCard";
import PokemonModal from "../PokemonModal";
import { typeColors } from "../../utils/typeColors";

const BASE_URL = "http://localhost:3001/api";

const PokemonList = ({ isDarkMode, searchTerm, setSearchTerm }) => {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isListView, setIsListView] = useState(false);
  const [lastOffset, setLastOffset] = useState(0);
  const limit = 30;

  const fetchPokemon = async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset;
      const response = await axios.get(`${BASE_URL}/pokemon`, {
        params: { offset: currentOffset, limit },
      });
      const newPokemon = response.data.filter((p) => p && p.id && p.sprites);
      setPokemon((prev) =>
        reset ? [...newPokemon] : [...prev, ...newPokemon]
      );
      setOffset((prev) => (reset ? limit : prev + limit));
      setHasMore(newPokemon.length === limit);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const loadMorePokemon = () => {
    if (hasMore) {
      fetchPokemon();
    }
  };

  useEffect(() => {
    const fetchPokemonBySearch = async (term) => {
      try {
        const response = await axios.get(`${BASE_URL}/search/${term}`);
        setPokemon([response.data]);
        setHasMore(false);
      } catch (error) {
        console.error("Error fetching Pokémon by search:", error);
        setPokemon([]);
      }
    };

    if (searchTerm.trim() === "") {
      setPokemon([]);
      setOffset(0);
      setHasMore(true);
      fetchPokemon(true);
    } else {
      fetchPokemonBySearch(searchTerm);
    }
  }, [searchTerm]);

  const handlePokemonClick = (p) => {
    setSelectedPokemon(p);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setPokemon([]);
    setOffset(0);
    setHasMore(true);
  };

  return (
    <div className={`pokemon-list-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="view-toggle-btn-container">
        <button
          className={`view-toggle-btn ${
            isListView ? "list-view" : "card-view"
          }`}
          onClick={() => setIsListView((prev) => !prev)}
          title={`Switch to ${isListView ? "Card" : "List"} View`}
        >
          {isListView ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4" width="6" height="6" fill="currentColor" />
              <rect x="14" y="4" width="6" height="6" fill="currentColor" />
              <rect x="4" y="14" width="6" height="6" fill="currentColor" />
              <rect x="14" y="14" width="6" height="6" fill="currentColor" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="4" cy="6" r="2" fill="currentColor" />
              <rect x="8" y="5" width="12" height="2" fill="currentColor" />
              <circle cx="4" cy="12" r="2" fill="currentColor" />
              <rect x="8" y="11" width="12" height="2" fill="currentColor" />
              <circle cx="4" cy="18" r="2" fill="currentColor" />
              <rect x="8" y="17" width="12" height="2" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
      <InfiniteScroll
        dataLength={pokemon.length}
        next={loadMorePokemon}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          pokemon.length === 0 ? (
            <p style={{ fontStyle: "italic" }}>No Pokémon found.</p>
          ) : (
            <p style={{ fontStyle: "italic" }}>"Gotta catch 'em all!"</p>
          )
        }
      >
        <div className={`pokemon-list ${isListView ? "list-view" : ""}`}>
          {pokemon.map((p, index) =>
            isListView ? (
              <div
                key={index}
                className="pokemon-list-item"
                onClick={() => handlePokemonClick(p)}
              >
                <img
                  src={p?.sprites?.front_default || ""}
                  alt={p.name}
                  className="list-item-image"
                />
                <span className="list-item-name">{p.name}</span>
                <div className="list-item-types">
                  {p?.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="type-badge"
                      style={{
                        backgroundColor: isDarkMode
                          ? typeColors[type].dark
                          : typeColors[type].light,
                        color: "#fff",
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <PokemonCard
                key={index}
                pokemon={p}
                onClick={() => handlePokemonClick(p)}
                isDarkMode={isDarkMode}
              />
            )
          )}
        </div>
      </InfiniteScroll>
      {searchTerm && (
        <button className="clear-search-btn" onClick={clearSearch}>
          Clear Search
        </button>
      )}
      {selectedPokemon && (
        <PokemonModal
          pokemon={selectedPokemon}
          onClose={closeModal}
          isDarkMode
        />
      )}
    </div>
  );
};

export default PokemonList;
