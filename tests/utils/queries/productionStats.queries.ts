import { sequelize } from "../../../src/config/sequelize";
import { CustomError } from "../../../src/helpers/customError.helpers";

/**
 * Get sheets where the id_ope_piece its the same because correspond at the same id_operation
 * @param {string} tableName Table name as specified in the database schema
 * @param {number} id_sheet ID of the sheet that corresponds to the operation_piece
 * @returns {void} This functions impacts on the database and doesnt returns anything
 */
export const returnArrayStatePieceOpe = async ( tableName: string, id_sheet: number ):Promise<StateOpe[][]> => {
  try {
    const querySheetByOrderAndOpePiece = `
    SELECT s1.id_ope_state FROM ${tableName} s1
    JOIN ${tableName} s2 ON s1.id_ope_piece = s2.id_ope_piece
    WHERE s2.id = ${id_sheet}
    AND s1.id_prod_order = s2.id_prod_order; `;
    const results = await sequelize.query( querySheetByOrderAndOpePiece );
    const data = results as StateOpe[][];
    return data;
  } catch ( error ) {
    const err = error as Error;
    throw new CustomError( err.message, 500, "helper.returnArraySheetIds" );
  }
};
type StateOpe = { id_ope_state: number };

