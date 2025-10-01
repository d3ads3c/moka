import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const customer = await prisma.customer.findUnique({ where: { id: params.id } });
  return NextResponse.json(customer);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.customer.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.customer.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


