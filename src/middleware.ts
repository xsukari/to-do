import { NextResponse, NextRequest } from "next/server"
import { cookies } from "next/headers"

async function usersExist() {
    const response = await fetch("http://localhost:" + process.env.PORT + "/api/users-exist")
    const data = await response.json() as { message: boolean }

    return data.message
}

async function getUserId(key: string) {
    const response = await fetch("http://localhost:" + process.env.PORT + "/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(key),
    })
    const data = await response.json() as { message: number | undefined }

    return data.message
}

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()
    const url = request.nextUrl.clone()

    const session = cookies().get("session")
    const user = session ? await getUserId(session.value) : undefined

    if (!user) {
        if (url.pathname.startsWith("/api")) {
            const isNotUsersExist = !url.pathname.startsWith("/api/users-exist")
            const isNotRegister = !url.pathname.startsWith("/api/register")
            const isNotLogin = !url.pathname.startsWith("/api/login")
            const isNotUser = !url.pathname.startsWith("/api/user")
    
            if (isNotUsersExist && isNotRegister && isNotLogin && isNotUser) {
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