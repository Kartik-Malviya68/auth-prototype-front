// lib/server-session.ts
import { cookies } from "next/headers";
import "server-only";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "bravo_token";

export type ServerUser = { id: string; email: string; name?: string | null };
export type ServerSession = { authenticated: false } | { authenticated: true; user: ServerUser };

export async function getServerSession(): Promise<ServerSession> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return { authenticated: false };

  const r = await fetch(`${API_BASE}/auth/session`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` }, // <-- forward as bearer
    cache: "no-store",
  });

  if (!r.ok) return { authenticated: false };
  const data = (await r.json()) as ServerSession;
  return data?.authenticated ? data : { authenticated: false };
}
