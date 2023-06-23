import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ERoutesList } from "./pages/api/paths"
import { getToken } from "next-auth/jwt"

export const middleware = async (request: NextRequest) => {
  const screen = ERoutesList.find(
    (screen) => request.nextUrl.pathname === screen.path,
  )

  if (!screen) {
    return NextResponse.next()
  }

  const jwt = await getToken({ req: request, secret: "secret" })

  if (jwt && jwt?.user && screen.type === "public" && screen.redirect) {
    return NextResponse.redirect(new URL(screen.redirect, request.url))
  }

  if (!jwt && screen.type === "private" && screen.redirect) {
    return NextResponse.redirect(new URL(screen.redirect, request.url))
  }

  return NextResponse.next()
}
