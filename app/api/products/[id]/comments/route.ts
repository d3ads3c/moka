import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const comments = await prisma.comment.findMany({ where: { productId: params.id }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const created = await prisma.comment.create({ data: { productId: params.id, author: data.author, message: data.message, rating: Math.max(1, Math.min(5, Number(data.rating ?? 5))) } });
  return NextResponse.json(created, { status: 201 });
}


