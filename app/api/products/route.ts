import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ready = searchParams.get("ready");
  const q = searchParams.get("q")?.trim();
  const category = searchParams.get("category")?.trim();
  const where: any = {};
  if (ready === "1") where.isReady = true;
  if (q) where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
  if (category) where.category = category;
  const items = await prisma.product.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const created = await prisma.product.create({ data });
  return NextResponse.json(created, { status: 201 });
}


