import React from "react";

const PokemonModal = ({ pokemon, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <h2>{pokemon.name}</h2>
        {pokemon?.sprites && pokemon?.sprites.front_default && (
          <img
            src={pokemon?.sprites.front_default}
            alt={`${pokemon.name} front`}
          />
        )}
        {pokemon?.sprites && pokemon?.sprites.back_default && (
          <img
            src={pokemon?.sprites.back_default}
            alt={`${pokemon.name} back`}
          />
        )}
        <p>
          <strong>Types:</strong> {pokemon.types.join(", ")}
        </p>
        <p>
          <strong>Region:</strong> {pokemon.region || "Unknown"}
        </p>
        <p>
          <strong>Weaknesses:</strong> {pokemon.weaknesses.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default PokemonModal;
