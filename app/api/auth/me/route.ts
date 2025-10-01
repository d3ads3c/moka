import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;
  const payload = token ? verifyJwt<{ uid: string }>(token) : null;
  if (!payload) return NextResponse.json({ user: null }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { id: payload.uid }, select: { id: true, email: true, name: true, role: true } });
  return NextResponse.json({ user });
}


