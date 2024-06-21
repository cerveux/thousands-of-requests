

/**
 * Process the error information for insertion into the database
 */
export const handleAndInsertError = async ( error: Error ) : Promise<void> => {
  try {
    // const nameFn: string = takeNameFn( error.stack! );
    console.log( "insertar error en algún lado.")
  } catch ( error ) {
    const err = error as Error;
    throw new Error( `${err.message}` );
  }
};