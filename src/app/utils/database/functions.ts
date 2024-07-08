import { db } from "./database"
import { NewUser, InviteUpdate, NewSession, SessionUpdate } from "./database_types"
import dayjs from "dayjs"

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

export async function getUser(username: string) {
    const query =
        db.selectFrom("user")
            .select("id")
            .select("password")
            .select("admin")
            .select("created_at")
            .where("username", "=", username)

    return await query.executeTakeFirst()
}

export async function newSession(userId: number, key: string, userAgent: string, expiresAt: Date) {
    const query1 = 
        db.selectFrom("session")
            .select("id")
            .where("user_agent", "=", userAgent)
            .where("user_id", "=", userId)
        
    const sessionDuplicate = await query1.executeTakeFirst()

    if (!sessionDuplicate) {
        const session: NewSession = {
            user_id: userId,
            key: key,
            user_agent: userAgent,
            expires_at: expiresAt,
        }
    
        const query2 = 
            db.insertInto("session").values(session)

        return await query2.executeTakeFirst()
    } else {
        const session: SessionUpdate = {
            key: key,
            expires_at: expiresAt,
        }

        const query2 = 
            db.updateTable("session")
                .where("id", "=", sessionDuplicate.id)
                .set(session)

        return await query2.executeTakeFirst()
    }
}

export async function cleanupExpiredSessions(userId: number) {
    const sessions = 
        await db.selectFrom("session")
            .select("id")
            .select("expires_at")
            .where("user_id", "=", userId)
            .execute()

    await db.transaction().execute(async (trx) => {
        sessions.forEach(session => {
            const expiresAt = dayjs(session.expires_at)
            const now = dayjs()

            if (now.isAfter(expiresAt)) {
                trx.deleteFrom("session")
                    .where("user_id", "=", userId)
                    .where("id", "=", session.id)
                    .executeTakeFirst()
            }
        })
    })
}

export async function getUserIdFromSession(key: string) {
    const query =
        db.selectFrom("session")
            .select("user_id")
            .where("key", "=", key)

    const data = await query.executeTakeFirst()

    return data?.user_id
}