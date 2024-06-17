import { Kysely, sql } from "kysely"
import { Database } from "../database_types"

export async function up(db: Kysely<Database>): Promise<void> {
    await db.schema
        .createTable("user")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("password", "text", (col) => col.notNull())
        .addColumn("admin", "boolean")
        .addColumn("modified_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn("created_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute()

    await db.schema
        .createTable("task")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("user_id", "integer", (col) =>
            col.references("user.id").onDelete("cascade").notNull()
        )
        .addColumn("name", "text", (col) => col.notNull())
        .addColumn("due_at", "text")
        .addColumn("additional_reminder", "boolean")
        .addColumn("modified_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn("created_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute()

    await db.schema
        .createTable("invite")
        .addColumn("id", "integer", (col) => col.primaryKey())
        .addColumn("email", "text", (col) => col.notNull().unique())
        .addColumn("valid", "boolean", (col) => col.notNull())
        .addColumn("modified_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`)
        )
        .addColumn("created_at", "text", (col) =>
            col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
        )
        .execute()
}

export async function down(db: Kysely<Database>): Promise<void> {
    await db.schema.dropTable("user").execute()
    await db.schema.dropTable("task").execute()
    await db.schema.dropTable("invite").execute()
}