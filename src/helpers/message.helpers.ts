import redisClient from "../config/redis";
import { v4 } from "uuid";



export const saveMessage = async ( userName: string, message: string ): Promise<string> => {
  const uuid = v4();
  const userKey: string = `${userName}:${uuid}`;

  const expireOptions: object = {
    EX: 60*60*24*2,
    NX: true,
  };

  await redisClient.set( userKey, message, expireOptions );
  return userKey;
};