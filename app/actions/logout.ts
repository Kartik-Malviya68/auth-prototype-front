"use server";

import { cookies } from "next/headers";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME || "bravo_token";

export async function logoutAction() {
    const token = (await cookies()).get(COOKIE_NAME)?.value;
    // Call backend logout with the cookie
    await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        headers: token ? { cookie: `${COOKIE_NAME}=${token}` } : {},
        cache: "no-store",
    });
    // Nothing else to do: the backend clears the cookie on its domain.
}
