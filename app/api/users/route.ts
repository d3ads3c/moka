import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({ select: { id: true, email: true, name: true, role: true }, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(users);
}


