import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const item = await prisma.product.findUnique({ where: { id: params.id } });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.product.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


