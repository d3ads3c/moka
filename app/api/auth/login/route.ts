import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { signJwt, verifyPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = signJwt({ uid: user.id, role: user.role });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("auth", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}


