import { usersExist } from "../../utils/database/functions"

export async function GET() {
    return Response.json({ message: await usersExist() ? true : false })
}