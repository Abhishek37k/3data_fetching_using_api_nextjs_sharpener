import { NextResponse } from "next/server";


export async function POST(request) {
    const res = NextResponse.json({ message: "Logout successful" }, { status: 200 });
    res.cookies.set("token", "", { httpOnly: true, path: "/" , maxAge: 0 });
    return res;
}