import React from "react";

const PokemonCard = ({ pokemon, onClick }) => {
  console.log(pokemon);
  return (
    <div className="pokemon-card" onClick={() => onClick(pokemon)}>
      {pokemon?.sprites && pokemon?.sprites.front_default ? (
        <img src={pokemon?.sprites.front_default} alt={pokemon.name} />
      ) : (
        <p>No image</p>
      )}
      <h3>{pokemon?.name}</h3>
      <p>{pokemon?.types.join(", ")}</p>
    </div>
  );
};

export default PokemonCard;
