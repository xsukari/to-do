import { NextResponse, NextRequest } from "next/server"

async function usersExist() {
    const response = await fetch("http://localhost:3000/api/users-exist")
    const data = await response.json()

    return data.message === "true"
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const auth = request.headers.get("authentication")
    const response = NextResponse.next()

    if (!auth && url.pathname.startsWith("/api")) {
        if (!url.pathname.startsWith("/api/users-exist")) {
            return new NextResponse(null, { status: 401 })
        }
    } else if (!auth && url.pathname.startsWith("/")) {
        if (await usersExist()) {
            url.pathname = "/login"
        } else {
            url.pathname = "/register"
        }

        return NextResponse.redirect(url)
    }

    return response
}

export const config = {
    matcher: [
        {
            source: "/((?!_next/static|_next/image|favicon.ico|icon.ico|register|login).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ]
        },
        {
            source: "/((?!_next/static|_next/image|favicon.ico|icon.ico|register|login).*)",
            has: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ]
        },
        {
            source: "/((?!_next/static|_next/image|favicon.ico|icon.ico|register|login).*)",
            has: [{ type: "header", key: "x-present" }],
            missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
        },
    ],
}