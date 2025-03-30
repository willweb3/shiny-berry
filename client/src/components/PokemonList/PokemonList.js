import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./PokemonList.css";

const BASE_URL = "http://localhost:3001/api";

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const limit = 20;

  const fetchPokemon = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pokemon`, {
        params: { offset, limit },
      });
      const newPokemon = response.data;

      setPokemon((prev) => [...prev, ...newPokemon]);
      setOffset((prev) => prev + limit);

      if (newPokemon.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error in get pokemón details:", error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const handlePokemonClick = (p) => {
    setSelectedPokemon(p);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={pokemon.length}
        next={fetchPokemon}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>All Pokémon loaded!</p>}
      >
        <div className="pokemon-list">
          {pokemon.map((p) => (
            <div
              key={p.id}
              className="pokemon-card"
              onClick={() => handlePokemonClick(p)}
            >
              <img src={p.sprites.front_default} alt={p.name} />
              <h3>{p.name}</h3>
              <p>{p.types.map((t) => t).join(", ")}</p>{" "}
            </div>
          ))}
        </div>
      </InfiniteScroll>

      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.sprites.front_default} alt="front" />
            <img src={selectedPokemon.sprites.back_default} alt="back" />
            <p>
              <strong>Types:</strong> {selectedPokemon.types.join(", ")}
            </p>
            <p>
              <strong>Region:</strong> {selectedPokemon.region}
            </p>
            <p>
              <strong>Weaknesses:</strong>{" "}
              {selectedPokemon.weaknesses.join(", ")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonList;
