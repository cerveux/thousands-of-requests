import { Response } from "express";
import { MessageRequest } from "../interfaces/message.interface";
import { saveMessage } from "../helpers/message.helpers";

export const postMessage = async ( req: MessageRequest, res: Response ): Promise<void> => {
  const { user_name, user_message } = req.body;
  await saveMessage( user_name, user_message );
  throw new Error( "el pepe" );
  // const { message, code } = await ArticleMethods.createArticle( article_number, description, layout_number );
  res.status( 200 ).json( { message: `Message from ${user_name} created succesfully.` } );
};
