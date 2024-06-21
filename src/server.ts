import express, { Application } from "express";
import { config } from "./config/config";
import swaggerDocs from "./config/swagger.ts";
import { errorHandler } from "./middlewares/handlers.middleware";
// import cors from "cors";
// import morgan from "morgan";
import {
  ArticleRoute,
} from "./routes";




const app: Application = express();

// Swagger documentation
( config.nodeEnv !== "test" ) && swaggerDocs( app, config.port );

// Middlewares
app.use( express.json() );

// ( config.nodeEnv !== "test" ) && app.use( morgan( "short" ) );



// Routes
app.use( "/api/article", ArticleRoute );

app.use( "*", errorHandler );


export default app;