const axios = require("axios");
const cache = require("../cache/cache");
const { getPokemonRegion, getWeaknesses } = require("../utils/pokemonUtils");

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 100;

async function fetchPokemonList() {
  const cacheKey = "pokemon-list";
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cache list");
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${LIMIT}`);
    const pokemonList = await Promise.all(
      response.data.results.map(async (pokemon) => {
        const detailResponse = await axios.get(pokemon.url);
        const data = detailResponse.data;
        const types = data.types.map((t) => t.type.name);
        return {
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
          },
          types,
          region: getPokemonRegion(data.id),
          weaknesses: getWeaknesses(types),
        };
      })
    );
    console.log("Yeah! Pokémon list:", pokemonList);
    await cache.set(cacheKey, pokemonList, 3600);
    return pokemonList;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

async function fetchPokemonDetails(id) {
  const cacheKey = `pokemon-${id}`;
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    console.log(`Return data by id ${id} (from cache)`);
    return cachedData;
  }

  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    const data = response.data;
    const types = data.types.map((t) => t.type.name);
    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: {
        front_default: data.sprites.front_default,
        back_default: data.sprites.back_default,
      },
      types,
      region: getPokemonRegion(data.id),
      weaknesses: getWeaknesses(types),
    };
    await cache.set(cacheKey, pokemon, 3600);
    return pokemon;
  } catch (error) {
    console.error(`Error to get data by id ${id}:`, error.message);
    throw error;
  }
}

module.exports = { fetchPokemonList, fetchPokemonDetails };
