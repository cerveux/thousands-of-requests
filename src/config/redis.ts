import { createClient } from "redis";

const redisClient = createClient( { disableOfflineQueue:false } );

export default redisClient;