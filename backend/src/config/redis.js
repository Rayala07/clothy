import { createClient } from "redis";
import { config } from "./config.js";

const redisClient = createClient({
  url: `redis://:${config.REDIS_PASSWORD}@${config.REDIS_ENDPOINT}:${config.REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.log("REDIS ERROR: ", err);
});

await redisClient.connect();

export default redisClient;
