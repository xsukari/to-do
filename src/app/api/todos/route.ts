import { Todo, TodoGroup } from "../../utils/definitions/types"
import { cookies } from "next/headers"
import { userIdFromSession, toDos } from "../../utils/database/functions"
import dayjs from "dayjs"

export async function GET() {
    const session = cookies().get("session")
    const key = session?.value
    const userId = key ? await userIdFromSession(key) : undefined
    if (!userId || !key) {
        return Response.json({ message: null })
    }

    const todos = await toDos(userId) as Todo[]

    const dateWithTimeZeroed = (date: Date) => {
        return dayjs(date).set("h", 0).set("m", 0).set("s", 0).set("ms", 0).toDate()
    }

    const uniqueDates =
        Array.from(new Set(todos.map((item: Todo) => 
            dayjs(item.due).format("YYYY-MM-DD")
        )))

    console.log(uniqueDates)

    const groupedTodos: TodoGroup[] = []

    uniqueDates.forEach(date => {
        groupedTodos.push({
            date: new Date(date),
            todos: todos.filter(todo => dayjs(todo.due).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")),
        })
    })

    return Response.json({ message: groupedTodos })
}