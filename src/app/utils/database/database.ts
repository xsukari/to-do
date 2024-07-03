import { Database } from "./database_types"
import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"

const dialect = new PostgresDialect({
    pool: new Pool({
        database: "todo",
        host: process.env.PG_DB_HOST,
        user: process.env.PG_DB_USER,
        password: process.env.PG_DB_PASSWORD,
        port: parseInt(process.env.PG_DB_PORT as string),
        max: 10,
    })
})

export const db = new Kysely<Database>({
    dialect,
})