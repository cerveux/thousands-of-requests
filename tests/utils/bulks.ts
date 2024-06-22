import redisClient from "../../src/config/redis";

/**
 * drops redis test sessions
 * @returns {void} This functions impacts on the redis database and doesnt returns anything
 */
export const dropTestSessions = async () => {
  for await ( const key of redisClient.scanIterator() ) {
    if ( key.includes( "test" ) ) {
      redisClient.del( key );
    }
  }


};