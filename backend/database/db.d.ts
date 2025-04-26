// db.d.ts

//Estas cosas raras se llaman "declaration files". Lo que hace: 
// Un archivo .d.ts que le dice a TypeScript cómo es la firma (los tipos) de una función, variable, clase, etc., que viene de un archivo sin tipos explícitos, como un .js.
// O sea, por ejemplo, el TypeScript necesita SI O SI, saber el tipo de retorno de una función. ¿Cual es el problema? que JavaScript no es de tipado explícito, por lo que no podes especificar el retorno de la función dentro del archivo .js
// entonces usas este "declaration file" para decirle a TypeScript "mira, ¿ves esta función de este otro lenguaje? Esta función es de este tipo, amigo."

import { ConnectionPool } from "mssql";

export function conectar(): Promise<ConnectionPool | null>;
export const sql: typeof import("mssql");
