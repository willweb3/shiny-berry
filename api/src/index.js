const express = require("express");
const pokemonController = require("./controllers/pokemonController");
const { fetchPokemonList } = require("./services/pokemonService");

const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Bolttedex MVP"));
app.get("/api/pokemon", pokemonController.getPokemonList);
app.get("/api/pokemon/:id", pokemonController.getPokemonById);

const CACHE_UPDATE_INTERVAL = 60 * 60 * 1000;
setInterval(async () => {
  try {
    console.log("Updating cache...");
    await fetchPokemonList();
  } catch (error) {
    console.error("Error:", error.message);
  }
}, CACHE_UPDATE_INTERVAL);

app.listen(port, () => {
  console.log(`Server running http://localhost:${port}`);
  fetchPokemonList()
    .then(() => console.log("Initial cache updated"))
    .catch((error) => console.error("Error:", error.message));
});
