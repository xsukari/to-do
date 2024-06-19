export async function GET() {
    const data = {
        message: "test"
    }

    return Response.json(data)
}