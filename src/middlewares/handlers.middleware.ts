import { NextFunction, Request, Response } from "express";
import { ParamsDictionary, RequestHandler } from "express-serve-static-core";
import { handleAndInsertError } from "../helpers/error.helpers";

export const asyncHandler = <T extends ParamsDictionary>(
    controller: RequestHandler<T>,
) => ( req: Request<T>, res: Response, next: NextFunction ) => 
    Promise.resolve( controller( req, res, next ) ).catch( next );
    
export const errorHandler = async ( error: Error, req: Request, res: Response, _next: NextFunction ) => {
  await handleAndInsertError( error );

  res.status( 500 ).json( {
    message: `Error: ${error.message}`
  } );
} ;