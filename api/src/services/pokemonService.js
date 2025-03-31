const axios = require("axios");
const cache = require("../cache/cache");
const { getPokemonRegion, getWeaknesses } = require("../utils/pokemonUtils");

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 2000;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const axiosInstance = axios.create({
  timeout: 10000,
});

async function fetchPokemonList() {
  const cacheKey = "pokemon-list";
  const cachedData = await cache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached Pokémon list");
    return cachedData;
  }

  try {
    console.log("Fetching Pokémon list from API...");
    const response = await axiosInstance.get(
      `${BASE_URL}/pokemon?limit=${LIMIT}`
    );

    console.log("API response:", response.data);

    const pokemonList = [];
    for (const pokemon of response.data.results) {
      try {
        const detailResponse = await axios.get(pokemon.url);
        const data = detailResponse.data;
        const types = data.types.map((t) => t.type.name);
        pokemonList.push({
          id: data.id,
          name: data.name,
          sprites: {
            front_default: data.sprites.front_default,
            back_default: data.sprites.back_default,
          },
          types,
          region: getPokemonRegion(data.id),
          weaknesses: getWeaknesses(types),
        });
        await delay(100);
      } catch (err) {
        console.error("Error fetching Pokémon details:", err);
      }
    }

    console.log("Final Pokémon list:", pokemonList.length);
    await cache.set(cacheKey, pokemonList, 3600);
    return pokemonList;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
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

async function fetchPokemonBySearch(term) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${term}`);
    const data = response.data;
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
  } catch (error) {
    console.error(
      `Error fetching Pokémon by search term "${term}":`,
      error.message
    );
    throw error;
  }
}

module.exports = {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonBySearch,
};
