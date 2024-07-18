import { userIdFromSession } from "../../utils/database/functions"

export async function POST(request: Request) {
    const data = await request.json()

    return Response.json({ message: await userIdFromSession(data) })
}