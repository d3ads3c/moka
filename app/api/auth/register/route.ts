import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password, name, role } = await req.json();
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: "Email already exists" }, { status: 409 });
  const user = await prisma.user.create({ data: { email, password: hashPassword(password), name, role } });
  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}


