import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; 

const SECRET_KEY = "abc123"; // Use

// helper to sign token
function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export async function POST(request) {
  const { email, password } = await request.json();

  // ✅ Use OR here so login fails if either is wrong
  if (email !== "abc@example.com" || password !== "abc123456") {
    return NextResponse.json({ message: "Login failed" }, { status: 401 });
  }

  const token = signToken({ email, role: "user" });

  const res = NextResponse.json(
    { message: "Login successful", token },
    { status: 200 }
  );

  // ✅ Set HttpOnly cookie
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  return res;
}
