import { ValidationChain, body } from "express-validator";
import { RequestHandler } from "express-serve-static-core";
import { validateErrors } from "../middlewares/validate";




const userName: ValidationChain = body( "user_name" ).not().isEmpty().withMessage( "The user_name is required." )
  .trim().isLength( { min: 3, max: 15 } ).withMessage( "The user's name length should be between 3 and 15 characters." );

const userMessage: ValidationChain = body( "user_message" ).not().isEmpty().withMessage( "The user_message is required." )
  .trim().isLength( { min: 3, max: 145 } )
  .withMessage( "The user's message length should be between 3 and 145 characters." );

export const postMessage: ValidationChain|RequestHandler[] = [
  userName,
  userMessage,
  validateErrors
];