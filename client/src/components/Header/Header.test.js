import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

test("renders header with search input", () => {
  const setSearchTerm = jest.fn();
  render(<Header searchTerm="" setSearchTerm={setSearchTerm} />);

  const input = screen.getByPlaceholderText("Search by name or ID");
  expect(input).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "Pikachu" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  expect(setSearchTerm).toHaveBeenCalledWith("Pikachu");
});
