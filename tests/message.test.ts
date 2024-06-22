import redisClient from "../src/config/redis";
import { dropTestSessions } from "./utils/bulks";
import createRequest from "./utils/supertest";

describe( "Message Routes", () => {
  const request = createRequest();

  beforeAll( async () => {
    await redisClient.connect();
    await dropTestSessions();
  } );

  // afterEach( async () => {
  //   await dropTestSessions();
  // } );

  afterAll( async () => {
    await dropTestSessions();
    await redisClient.quit();
  } );

  describe( "POST /api/message", () =>{
    const mockMessage = {
      user_name: "test",
      user_message: "hol"
    };

    const sendMessages = async ( users:number ):Promise<void> => {
      for ( let i = 0; i < users; i++ ) {
        const { status } = await request.post( "/api/message" ).send( mockMessage );
        expect( status ).toBe( 200 );
      }
    };

    test( "should create 1000 messages correctly",async () => {
      const users = 1000;
      await sendMessages( users );
    } );

    test( "should create 6000 messages correctly",async () => {
      const users = 1000;
      const simultaneousUsers = 6;
      const promises: void[] = [];
      for ( let i = 0; i < simultaneousUsers; i++ ) {
        promises.push( await sendMessages( users ) );
      }
      await Promise.all( promises );

    }, 60000 );

  } );
} );