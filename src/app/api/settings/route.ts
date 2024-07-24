import { Settings } from "@/app/utils/definitions/types"
import { cookies } from "next/headers"
import { userIdFromSession, settings } from "../../utils/database/functions"

export async function GET() {
    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await userIdFromSession(key) : undefined
    if (!userId || !key) {
        return Response.json({ message: null })
    }

    const userSettings = await settings(userId)
    if (!userSettings) {
        return Response.json({ message: null })
    }

    const sanitizedSettings: Settings = {
        timeRangePast: userSettings.timeRangePast,
        timeRangeFuture: userSettings.timeRangeFuture,
        alwaysShowIncomplete: userSettings.alwaysShowIncomplete === "true" ? true : false,
        additionalReminderAfter: parseInt(userSettings.additionalReminderAfter),
    }

    return Response.json({ message: sanitizedSettings })
}