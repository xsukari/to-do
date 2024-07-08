import { db } from "./database"
import { NewUser, InviteUpdate } from "./database_types"

export async function usersExist() {
    const query = 
        db.selectFrom("user")
            .select("id")
            .limit(1)

    const data = await query.executeTakeFirst()

    return data ? true : false
}

export async function invitedAndValid(email: string) {
    const query = 
        db.selectFrom("invite")
            .select("id")
            .where("email", "=", email)
            .where("valid", "=", true)
            .where("registered", "=", false)
            .limit(1)

    const data = await query.executeTakeFirst()

    return data ? true : false
}

export async function newUserAndUpdateInvite(username: string, email: string, hashedPassword: string, admin: boolean) {
    const user: NewUser = {
        username: username,
        email: email,
        password: hashedPassword,
        admin: admin,
        updated_at: new Date(),
    }

    const invite: InviteUpdate = {
        valid: false,
        registered: true,
        updated_at: new Date(),
    }

    await db.transaction().execute(async (trx) => {
        trx.insertInto("user")
            .values(user)
            .executeTakeFirst()

        trx.updateTable("invite")
            .set(invite)
            .where("email", "=", email)
            .executeTakeFirst()
    })
}

export async function usernameTaken(username: string) {
    const query = 
        db.selectFrom("user")
            .select("id")
            .where("username", "=", username)

    const data = await query.executeTakeFirst()

    return data ? true : false
}

export async function newUser(username: string, email: string, hashedPassword: string, admin: boolean) {
    const user: NewUser = {
        username: username,
        email: email,
        password: hashedPassword,
        admin: admin,
        updated_at: new Date(),
    }

    const query = db.insertInto("user").values(user)

    await query.executeTakeFirst()
}

export async function removeUser(username: string, email: string) {
    const query = 
        db.deleteFrom("user")
            .where("username", "=", username)
            .where("email", "=", email)

    await query.executeTakeFirst()
}