import { render, screen } from "@testing-library/react";
import PokemonCard from "./PokemonCard";

test("renders Pokémon name and types", () => {
  const pokemon = {
    name: "Bulbasaur",
    sprites: { front_default: "bulbasaur.png" },
    types: ["Grass", "Poison"],
  };

  render(
    <PokemonCard pokemon={pokemon} onClick={() => {}} isDarkMode={false} />
  );

  expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  expect(screen.getByText("Grass")).toBeInTheDocument();
  expect(screen.getByText("Poison")).toBeInTheDocument();
});
