import mysql, {
  type ResultSetHeader,
  type RowDataPacket,
} from "mysql2/promise";

type QueryValue = string | number | boolean | null;

interface QueryParams {
  query: string;
  values?: QueryValue[];
}

export async function query<T extends RowDataPacket[] | ResultSetHeader>({
  query,
  values = [],
}: QueryParams): Promise<T> {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const [results] = await connection.execute<T>(query, values);
    return results;
  } finally {
    await connection.end();
  }
}