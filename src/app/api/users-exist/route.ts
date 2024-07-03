import { db } from "../../utils/database/database"

export async function GET() {
    const query = db.selectFrom("User").select("id").limit(1)

    const dbData = await query.executeTakeFirst()

    const data = {
        message: dbData ? "true" : "false"
    }

    return Response.json(data)
}