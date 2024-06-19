import { NextResponse, NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-middleware-request", "true")
   
    const response = NextResponse.next()
   
    response.headers.set("x-middleware-response", "true")
    return response
}

export const config = {
    matcher: "/api/(.+)",
}