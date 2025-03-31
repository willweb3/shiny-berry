import { render, screen } from "@testing-library/react";
import PokemonList from "./PokemonList";
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("renders loading message", () => {
  render(
    <PokemonList isDarkMode={false} searchTerm="" setSearchTerm={() => {}} />
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
