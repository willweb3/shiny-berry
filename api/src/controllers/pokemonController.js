const {
  fetchPokemonList,
  fetchPokemonDetails,
} = require("../services/pokemonService");

async function getPokemonList(req, res) {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 20;
    const pokemonList = await fetchPokemonList();
    const paginatedList = pokemonList.slice(offset, offset + limit);
    res.json(paginatedList);
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
