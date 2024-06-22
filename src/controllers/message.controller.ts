import { Response } from "express";
import { MessageRequest } from "../interfaces/message.interface";
import { saveMessage } from "../helpers/message.helpers";

export const postMessage = async ( req: MessageRequest, res: Response ): Promise<void> => {
  const { user_name, user_message } = req.body;
  const userKey = await saveMessage( user_name, user_message );

  res.status( 200 ).json(
    {
      message: `Message from ${user_name} saved succesfully with key ${userKey}.`
    }
  );
};
