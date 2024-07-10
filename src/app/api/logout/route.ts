import { cookies } from "next/headers"
import { getUserIdFromSession, cleanupExpiredSessions, removeSession } from "../../utils/database/functions"

export async function POST() {
    let text = ""
    let success = false

    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await getUserIdFromSession(key) : undefined
    if (!userId || !key) {
        text = "Could not find user or session."
        return Response.json({ message: { success: success, text: text } })
    }

    const removedSession = await removeSession(key, userId)
    if (!removedSession) {
        text = "Session could not be deleted."
        return Response.json({ message: { success: success, text: text } })
    }

    cookies().delete("session")

    text = "Logout successful."
    success = true

    await cleanupExpiredSessions(userId)

    return Response.json({ message: { success: success, text: text } })
}