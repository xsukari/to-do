import { db } from "../../data/database/database"

export async function GET() {
    const query = db.selectFrom("User").select("id").limit(1)

    const dbData = await query.execute()

    const data = {
        message: dbData ? "true" : "false"
    }

    return Response.json(data)
}