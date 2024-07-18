import { Todo } from "@/app/utils/definitions/types"
import { cookies } from "next/headers"
import { userIdFromSession, newTodo } from "../../utils/database/functions"

export async function POST(request: Request) {
    let text = ""
    let success = false

    const todo = await request.json() as Todo

    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await userIdFromSession(key) : undefined
    if (!userId || !key) {
        text = "Could not find user or session."
        return Response.json({ message: { success: success, text: text } })
    }

    const createdTodo = await newTodo(userId, todo.name, todo.date, todo.reminder)
    if (!createdTodo) {
        text = "Could not create todo."
        return Response.json({ message: { success: success, text: text } })
    }

    text = "Successfully created todo."
    success = true
    return Response.json({ message: { success: success, text: text } })
}