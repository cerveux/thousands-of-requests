import http from "http";
import app from "./server";
import { config } from "./config/config";
import redisClient from "./config/redis";

const PORT: number = config.port;

if ( config.nodeEnv !== "test" ) {

  // Connection to Redis
  redisClient.connect()
    .then( () => {
      console.log( "Connection to the redis" );
    } )
    .catch( ( error: Error ) => {
      console.error( "Connect to redis failed", error );
    } );

  // Create Server
  const server = http.createServer( app );

  server.listen( PORT, () => {
    console.log( `Server is running on port ${PORT}` );
  } );
}