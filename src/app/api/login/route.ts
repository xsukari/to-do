import { LoginCredentials } from "../../utils/definitions/types"
import { getUser, newSession, cleanupExpiredSessions } from "../../utils/database/functions"
import { comparePasswords, generateSessionKey } from "../../utils/tools/crypto"
import dayjs from "dayjs"
import { cookies } from "next/headers"
import { userAgent } from "next/server"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const creds = await request.json() as LoginCredentials

    const user = await getUser(creds.username)
    if (!user) {
        text = "Incorrect username or password."
        return Response.json({ message: { success: success, text: text } })
    }

    const passwordsMatch = await comparePasswords(creds.password, user.password)
    if (!passwordsMatch) {
        text = "Incorrect username or password."
        return Response.json({ message: { success: success, text: text } })
    }

    const key = 
        await generateSessionKey(
            user.id.toString()
            + user.created_at.getTime().toString()
            + Date.now().toString()
        )
    if (!key) {
        text = "Could not generate session key."
        return Response.json({ message: { success: success, text: text } })
    }

    const agent = userAgent(request)
    const usrAgent = agent.browser.name + "-" + agent.os.name + "-" + agent.cpu.architecture
    const expiresAt = dayjs().add(2, "weeks")
    const session = await newSession(user.id, key, usrAgent, expiresAt.toDate())
    if (!session) {
        text = "Could not create session."
        return Response.json({ message: { success: success, text: text } })
    }

    cookies().set({
        name: "session",
        value: key,
        httpOnly: true,
        secure: true,
        expires: expiresAt.valueOf(),
    })

    text = "Login successful. Redirecting to app shortly..."
    success = true

    const deletedSessions = await cleanupExpiredSessions(user.id)
    if (!deletedSessions) {
        text = "Login successful. Some of your expired sessions could not be cleaned up, please contact your administrator."
        + " "
        + "Redirecting to app shortly..."
    }

    return Response.json({ message: { success: success, text: text } })
}