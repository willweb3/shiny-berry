import React from "react";
import { typeColors } from "../../utils/typeColors";
import "./PokemonModal.css";

const PokemonModal = ({ pokemon, onClose, isDarkMode }) => {
  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content slide-up">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>
          #{pokemon.id} {pokemon.name}
        </h2>
        <div className="image-container">
          {pokemon?.sprites?.front_default && (
            <img
              src={pokemon.sprites.front_default}
              alt={`${pokemon.name} front`}
            />
          )}
          {pokemon?.sprites?.back_default && (
            <img
              src={pokemon.sprites.back_default}
              alt={`${pokemon.name} back`}
            />
          )}
        </div>
        <div className="type-container">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="type-badge"
              style={{
                backgroundColor: isDarkMode
                  ? typeColors[type].dark
                  : typeColors[type].light,
              }}
            >
              {type}
            </span>
          ))}
        </div>
        <p>
          <strong>Region:</strong> {pokemon.region || "Unknown"}
        </p>
        <p>
          <strong>Weaknesses:</strong>
        </p>
        <div className="type-container">
          {pokemon.weaknesses.map((weakness, index) => (
            <span
              key={index}
              className="type-badge"
              style={{
                backgroundColor: isDarkMode
                  ? typeColors[weakness].dark
                  : typeColors[weakness].light,
              }}
            >
              {weakness}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
