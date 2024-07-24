export async function GET() {
    const result = await fetch("http://127.0.0.1:5000/update", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    console.log("\n" + result + "\n")

    const data = await result.json()

    return Response.json(data)
}