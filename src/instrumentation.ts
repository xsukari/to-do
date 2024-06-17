//import { db } from "./app/data/database"
//import * as path from "path"
//import fs from "node:fs/promises"
/*import { Migrator, FileMigrationProvider, sql, Kysely, PostgresDialect } from "kysely"
import { Pool } from "pg"
import { Database } from "./database/database_types"

async function createDatabase() {
    const database = new Kysely<Database>({
        dialect: new PostgresDialect({
            pool: new Pool({
                host: "localhost",
                user: "postgres",
                password: "postgres",
                port: 5432,
            }),
        }),
    })

    await sql`SELECT 'CREATE DATABASE todo' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'todo')\gexec`.execute(database)

    await database.destroy()
}*/

/*async function migrateToLatest() {
    const migrator = new Migrator({
        db,
        provider: new FileMigrationProvider({
            fs,
            path,
            migrationFolder: path.join(__dirname, "/src/app/data/migrations/"),
        }),
    })
  
    const { error, results } = await migrator.migrateToLatest()
  
    results?.forEach((it) => {
        if (it.status === "Success") {
            console.log(`migration "${it.migrationName}" was executed successfully`)
        } else if (it.status === "Error") {
            console.error(`failed to execute migration "${it.migrationName}"`)
        }
    })
  
    if (error) {
        console.error("failed to migrate")
        console.error(error)
        await db.destroy()
        process.exit(1)
    }
}*/

export function register() {
    //createDatabase()
    //migrateToLatest()
}