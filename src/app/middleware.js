import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  request.user = user;
  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/logout"],
};
