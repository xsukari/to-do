import { db } from "./database"
import { NewUser, InviteUpdate, NewSession, SessionUpdate, NewTodo, NewSettingUser, SettingUserUpdate } from "./types"
import dayjs from "dayjs"
import { settings as settingsNames } from "../definitions/values"
import { DeleteResult, UpdateResult } from "kysely"

function defaultSettings() {
    const defaultTimeRangePast: NewSettingUser = {
        user_id: 0,
        setting_id: 1,
        value: "1d",
        updated_at: new Date(),
    }
    
    const defaultTimeRangeFuture: NewSettingUser = {
        user_id: 0,
        setting_id: 2,
        value: "1d",
        updated_at: new Date(),
    }
    
    const defaultAlwaysShowIncomplete: NewSettingUser = {
        user_id: 0,
        setting_id: 3,
        value: "true",
        updated_at: new Date(),
    }
    
    const defaultAdditionalReminderAfter: NewSettingUser = {
        user_id: 0,
        setting_id: 4,
        value: "15",
        updated_at: new Date(),
    }
    
    return [
        defaultTimeRangePast,
        defaultTimeRangeFuture,
        defaultAlwaysShowIncomplete,
        defaultAdditionalReminderAfter,
    ]
}

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

export async function newUser(username: string, email: string, hashedPassword: string, admin: boolean) {
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

    const settings = defaultSettings()

    await db.transaction().execute(async (trx) => {
        const insertedUser = 
            await trx.insertInto("user")
                .values(user)
                .returning("id")
                .executeTakeFirst()

        if (!insertedUser) {
            throw Error("No user was inserted into database.")
        }

        trx.updateTable("invite")
            .set(invite)
            .where("email", "=", email)
            .executeTakeFirst()

        settings.forEach(setting => {
            setting.user_id = insertedUser.id
            trx.insertInto("setting_user")
                .values(setting)
                .executeTakeFirst()
        })
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

export async function newUserFirst(username: string, email: string, hashedPassword: string, admin: boolean) {
    const user: NewUser = {
        username: username,
        email: email,
        password: hashedPassword,
        admin: admin,
        updated_at: new Date(),
    }

    const settings = defaultSettings()

    await db.transaction().execute(async (trx) => {
        const insertedUser = 
            await trx.insertInto("user")
                .values(user)
                .returning("id")
                .executeTakeFirst()

        if (!insertedUser) {
            throw Error("No user was inserted into database.")
        }

        settings.forEach(setting => {
            setting.user_id = insertedUser.id
            trx.insertInto("setting_user")
                .values(setting)
                .executeTakeFirst()
        })
    })
}

export async function removeUser(username: string, email: string) {
    const query = 
        db.deleteFrom("user")
            .where("username", "=", username)
            .where("email", "=", email)

    return await query.executeTakeFirst()
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

    if (!sessions) {
        return "No sessions to clean up."
    }

    try {
        return await db.transaction().execute(async (trx) => {
            const deleteResult: DeleteResult[] = []
    
            sessions.forEach(async (session) => {
                const expiresAt = dayjs(session.expires_at)
                const now = dayjs()
    
                if (now.isAfter(expiresAt)) {
                    const deletedSession =
                        await trx.deleteFrom("session")
                            .where("user_id", "=", userId)
                            .where("id", "=", session.id)
                            .executeTakeFirst()
    
                    if (!deletedSession) {
                        throw Error("Sessions could not be cleaned up.")
                    }
    
                    deleteResult.push(deletedSession)
                }
            })
    
            return deleteResult
        })
    } catch (error) {
        return null
    }
}

export async function userIdFromSession(key: string) {
    const query =
        db.selectFrom("session")
            .select("user_id")
            .where("key", "=", key)

    const data = await query.executeTakeFirst()

    return data?.user_id
}

export async function removeSession(key: string, userId: number) {
    const query =
        db.deleteFrom("session")
            .where("key", "=", key)
            .where("user_id", "=", userId)

    return await query.executeTakeFirst()
}

export async function newTodo(userId: number, name: string, date: Date, reminder: boolean) {
    const todo: NewTodo = {
        user_id: userId,
        name: name,
        due_at: date,
        additional_reminder: reminder,
        updated_at: new Date(),
    }

    const query =
        db.insertInto("todo")
            .values(todo)

    return await query.executeTakeFirst()
}

export async function settings(userId: number) {
    const timeRangePast =
        await db.selectFrom("setting_user")
            .select("value")
            .leftJoin("setting", "setting.id", "setting_id")
            .where("user_id", "=", userId)
            .where("name", "=", settingsNames.timeRangePast)
            .executeTakeFirst()

    const timeRangeFuture =
        await db.selectFrom("setting_user")
            .select("value")
            .leftJoin("setting", "setting.id", "setting_id")
            .where("user_id", "=", userId)
            .where("name", "=", settingsNames.timeRangeFuture)
            .executeTakeFirst()

    const alwaysShowIncomplete =
        await db.selectFrom("setting_user")
            .select("value")
            .leftJoin("setting", "setting.id", "setting_id")
            .where("user_id", "=", userId)
            .where("name", "=", settingsNames.alwaysShowIncomplete)
            .executeTakeFirst()

    const additionalReminderAfter =
        await db.selectFrom("setting_user")
            .select("value")
            .leftJoin("setting", "setting.id", "setting_id")
            .where("user_id", "=", userId)
            .where("name", "=", settingsNames.additionalReminderAfter)
            .executeTakeFirst()

    if (!timeRangePast || !timeRangeFuture || !alwaysShowIncomplete || !additionalReminderAfter) {
        return null
    }

    return {
        timeRangePast: timeRangePast.value,
        timeRangeFuture: timeRangeFuture.value,
        alwaysShowIncomplete: alwaysShowIncomplete.value,
        additionalReminderAfter: additionalReminderAfter.value,
    }
}

export async function updateSettings(userId: number, settings: { name: string, value: string }[]) {
    try {
        return await db.transaction().execute(async (trx) => {
            const updateResult: UpdateResult[] = []
    
            settings.forEach(async (setting) => {
                const settingId =
                    await trx.selectFrom("setting")
                        .select("id")
                        .where("name", "=", setting.name)
                        .executeTakeFirst()
    
                if (!settingId) {
                    throw Error("No matching setting definition was found.")
                }
    
                const settingUpdate: SettingUserUpdate = {
                    value: setting.value,
                    updated_at: new Date(),
                }

                const updatedSetting =
                    await trx.updateTable("setting_user")
                        .where("setting_id", "=", settingId.id)
                        .set(settingUpdate)
                        .executeTakeFirst()

                if (!updatedSetting) {
                    throw Error("Setting could not be updated.")
                }
    
                updateResult.push(updatedSetting)
            })

            return updateResult
        })
    } catch (error) {
        return null
    }
}

export async function todos(/*userId: number*/) {

}