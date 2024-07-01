import { db } from "../../data/database/database"
import { NewUser, InviteUpdate } from "../../data/database/database_types"

export async function usersExist() {
    const query = 
        db.selectFrom("User")
            .select("id")
            .limit(1)

    const dbData = await query.executeTakeFirst()

    return dbData ? true : false
}

export async function invitedAndValid(email: string) {
    const query = 
        db.selectFrom("Invite")
            .select("id")
            .where("email", "=", email)
            .where("valid", "=", true)
            .where("registered", "=", false)
            .limit(1)

    const dbData = await query.executeTakeFirst()

    return dbData ? true : false
}

export async function newUserAndUpdateInvite(username: string, email: string, hashedPassword: string, admin: boolean) {
    const user: NewUser = {
        username: username,
        email: email,
        password: hashedPassword,
        admin: admin,
        updatedAt: new Date().toISOString(),
    }

    const invite: InviteUpdate = {
        valid: false,
        registered: true,
        updatedAt: new Date(),
    }

    await db.transaction().execute(async (trx) => {
        trx.insertInto("User")
            .values(user)
            .executeTakeFirst()

        trx.updateTable("Invite")
            .set(invite)
            .where("email", "=", email)
            .executeTakeFirst()
    })
}

export async function usernameTaken(username: string) {
    const query = 
        db.selectFrom("User")
            .select("id")
            .where("username", "=", username)

    const dbData = await query.executeTakeFirst()

    return dbData ? true : false
}

export async function newUser(username: string, email: string, hashedPassword: string, admin: boolean) {
    const user: NewUser = {
        username: username,
        email: email,
        password: hashedPassword,
        admin: admin,
        updatedAt: new Date().toISOString(),
    }

    const query = db.insertInto("User").values(user)

    await query.executeTakeFirst()
}

export async function removeUser(username: string, email: string) {
    const query = 
        db.deleteFrom("User")
            .where("username", "=", username)
            .where("email", "=", email)

    await query.executeTakeFirst()
}