import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.blogPost.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


