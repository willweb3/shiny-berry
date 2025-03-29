const {
  fetchPokemonList,
  fetchPokemonDetails,
} = require("../services/pokemonService");

async function getPokemonList(req, res) {
  try {
    const pokemonList = await fetchPokemonList();
    const formattedList = pokemonList.map((p) => ({
      name: p.name,
    }));
    res.json(formattedList);
  } catch (error) {
    res.status(500).json({ error: "Error to get the list" });
  }
}

async function getPokemonById(req, res) {
  try {
    const pokemon = await fetchPokemonDetails(req.params.id);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: `Error to get pokémon ${req.params.id}` });
  }
}

module.exports = { getPokemonList, getPokemonById };
