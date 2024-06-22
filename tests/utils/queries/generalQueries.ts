import { sequelize } from "../../../src/config/sequelize";
import { CustomError } from "../../../src/helpers/customError.helpers";

/**
 * Inserts new registry into specified table
 * @param {string} tableName Table name as specified in the database schema
 * @param {object} data All the table atributes as specified in the database schema with its corresponding values in a object
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
export const insertIntoTable = async ( tableName: string, data: object ) => {
  try {
    const keys = Object.getOwnPropertyNames( data );
    const sanitizedKeys = keys.map( key => `${"`" + key + "`"}` );
    const values = Object.values( data ).map( value => {
      if( "boolean" === typeof value ) {
        return value;
      }
      return "'" + value + "'";
    } );
    await sequelize.query(
      `INSERT INTO ${"`" + tableName + "`"} (${ sanitizedKeys }) VALUES ( ${values} )` );
  } catch ( error ) {
    const err = error as Error;
    throw new CustomError( err.message, 500, "helper.inserIntoTable" );
  }
};

/**
 * Inserts new registries into specified table
 * @param {string} tableName Table name as specified in the database schema
 * @param {object} data An array with all the table atributes as specified in the database
 *                       schema with its corresponding values in a object
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
export const insertManyIntoTable = async ( tableName: string, data: object[] ) => {
  try {
    const keys = Object.getOwnPropertyNames( data[0] );
    const sanitizedKeys = keys.map( key => `${"`" + key + "`"}` );
    const values = data.map( row => {
      return Object.values( row ).map( ( value ) => {
        if( "boolean" === typeof value ) {
          return value;
        }
        return "'" + value + "'";
      } );
    } );
    const valuesString:string[] = [];
    values.forEach( value => { valuesString.push( `( ${value})` ); } );
    const query =
    `INSERT INTO ${"`" + tableName + "`"} (${sanitizedKeys}) VALUES  ${valuesString} `;
    await sequelize.query( query );
  } catch ( error ) {
    const err = error as Error;
    throw new CustomError( err.message, 500, "helper.insertManyIntoTable" );
  }
};