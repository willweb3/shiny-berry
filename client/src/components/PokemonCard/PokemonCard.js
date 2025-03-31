import React from "react";
import { typeColors } from "../../utils/typeColors";
import "./PokemonCard.css";

const PokemonCard = ({ pokemon, onClick, isDarkMode }) => {
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      {pokemon?.sprites && pokemon?.sprites.front_default ? (
        <img src={pokemon?.sprites.front_default} alt={pokemon.name} />
      ) : (
        <p>No image</p>
      )}
      <h3>{pokemon?.name}</h3>
      <div className="type-container">
        {pokemon?.types.map((type, index) => (
          <span
            key={index}
            className="type-badge"
            style={{
              backgroundColor: isDarkMode
                ? typeColors[type]?.dark || "#000"
                : typeColors[type]?.light || "#fff",
            }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
