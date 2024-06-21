import express, { Application } from "express";
import { config } from "./config/config";
import redisClient from "./config/redis";
import messageRoutes from "./routes/message.routes";
import { errorHandler } from "./middlewares/handlers.middleware";


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
  const app: Application = express();

  app.use( express.json() );

  app.use( "/api/message", messageRoutes );

  app.use( "*", errorHandler );



  app.listen( PORT, () => {
    console.log( `Server is running on port ${PORT}` );
  } );
}