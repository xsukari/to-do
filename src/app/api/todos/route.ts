import { Todo } from "../../utils/definitions/types"
import { cookies } from "next/headers"
import { userIdFromSession, todos } from "../../utils/database/functions"

export async function GET() {
    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await userIdFromSession(key) : undefined
    if (!userId || !key) {
        return Response.json({ message: null })
    }

    const dbTodos = await todos(userId) as Todo[]

    return Response.json({ message: dbTodos })
}