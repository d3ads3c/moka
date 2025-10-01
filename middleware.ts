import { NextRequest, NextResponse } from "next/server";

function decodeJwtPayload<T = any>(token?: string): T | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const json = Buffer.from(payload, "base64").toString("utf8");
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("auth")?.value;
    const payload = decodeJwtPayload<{ uid: string; role: string }>(token);
    if (!payload || payload.role !== "ADMIN") {
      const url = new URL("/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  if (pathname.startsWith("/panel")) {
    const token = req.cookies.get("auth")?.value;
    const payload = decodeJwtPayload<{ uid: string; role: string }>(token);
    if (!payload) {
      const url = new URL("/login", req.url);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/panel/:path*"],
};


