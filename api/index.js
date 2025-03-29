const express = require("express");
const axios = require("axios");
const app = express();
const port = 3001;

const BASE_URL = "https://pokeapi.co/api/v2";
const LIMIT = 100;

app.get("/", (req, res) => {
  res.send("hello");
});

async function fetchPokemonApi() {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=${LIMIT}`);
    const list = response.data;
    console.log(`The list:`, list);
    return list;
  } catch {
    console.error("Error:", error.message);
    throw error;
  }
}

fetchPokemonApi();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
