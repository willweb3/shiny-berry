import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./PokemonList.css";
import PokemonCard from "../PokemonCard";
import PokemonModal from "../PokemonModal";

const BASE_URL = "http://localhost:3001/api";

const PokemonList = () => {
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
            <PokemonCard pokemon={p} onClick={() => handlePokemonClick(p)} />
          ))}
        </div>
      </InfiniteScroll>

      {selectedPokemon && (
        <PokemonModal pokemon={selectedPokemon} onClose={closeModal} />
      )}
    </>
  );
};

export default PokemonList;
