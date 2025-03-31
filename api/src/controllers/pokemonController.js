const {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonBySearch,
} = require("../services/pokemonService");

async function getPokemonList(req, res) {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 30;
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

async function searchPokemon(req, res) {
  try {
    const term = req.params.term.toLowerCase();
    const pokemon = await fetchPokemonBySearch(term);
    res.json(pokemon);
  } catch (error) {
    res.status(404).json({ error: `Pokémon "${req.params.term}" not found` });
  }
}

module.exports = { getPokemonList, getPokemonById, searchPokemon };
