import request from "supertest";
import app from "../../src/server";

export default () => {
  return request( app );
};
