import { NextResponse, NextRequest } from "next/server"

async function usersExist() {
    const response = await fetch("http://localhost:3000/api/users-exist") // TODO change to generic
    const data = await response.json()

    return data.message === "true"
}

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const auth = request.headers.get("authentication")
    const response = NextResponse.next()

    if (!auth) {
        if (url.pathname.startsWith("/api")) {
            const isNotUsersExist = !url.pathname.startsWith("/api/users-exist")
            const isNotRegister = !url.pathname.startsWith("/api/register")
            const isNotLogin = !url.pathname.startsWith("/api/login")
    
            if (isNotUsersExist && isNotRegister && isNotLogin) {
                return new NextResponse(null, { status: 401 })
            }
        } else if (url.pathname.startsWith("/")) {
            if (await usersExist()) {
                url.pathname = "/login"
            } else {
                url.pathname = "/register"
            }
    
            return NextResponse.redirect(url)
        }
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