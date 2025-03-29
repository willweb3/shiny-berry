const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379",
});

client.on("error", (err) => console.error("Erro no Redis:", err));

(async () => {
  await client.connect();
})();

async function get(key) {
  const data = await client.get(key);
  return data ? JSON.parse(data) : null;
}

async function set(key, data, ttlSeconds) {
  await client.setEx(key, ttlSeconds, JSON.stringify(data));
}

module.exports = { get, set };
