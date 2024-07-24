import { SetSettings } from "../../utils/definitions/types"
import { cookies } from "next/headers"
import { userIdFromSession, updateSettings } from "../../utils/database/functions"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const settings = await request.json() as SetSettings

    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await userIdFromSession(key) : undefined
    if (!userId || !key) {
        text = "Could not find user."
        return Response.json({ message: { success: success, text: text } })
    }

    const settingsNames = Object.keys(settings)
    const settingsArray: { name: string, value: string }[] = []
    settingsNames.forEach((setting) => {
        const value = settings[setting as keyof SetSettings] ? settings[setting as keyof SetSettings] as string : ""

        settingsArray.push({ name: setting, value: value })
    })

    const updatedSettings = await updateSettings(userId, settingsArray)
    if (!updatedSettings) {
        text = "Could not update settings."
        return Response.json({ message: { success: success, text: text } })
    }

    text = "Updated settings."
    success = true
    return Response.json({ message: { success: success, text: text } })
}