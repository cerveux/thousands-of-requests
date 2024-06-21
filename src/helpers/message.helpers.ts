import redisClient from "../config/redis";
import { v4 } from "uuid";



export const saveMessage = async ( userName: string, message: string ) => {
  const uuid = v4();
  const userKey: string = `${userName}:${uuid}`;
  const expireOptions: object = {
    EX: 46800,
    NX: true,
  };
  await redisClient.set( userKey, message, expireOptions );
};