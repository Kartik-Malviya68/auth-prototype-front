export const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // sends API cookie in browser
    headers: { "content-type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.error || "Request failed");
  return data as T;
}

export const api = {
  // Register
  registerRequestOtp: (email: string, name?: string) =>
    request<{ message: string }>("/auth/register/request-otp", {
      method: "POST", body: JSON.stringify({ email, name }),
    }),
  registerVerifyOtp: (email: string, otp: string, name?: string) =>
    request<{ user: { id: string; email: string; name?: string | null } }>(
      "/auth/register/verify-otp",
      { method: "POST", body: JSON.stringify({ email, otp, name }) }
    ),

  // Login
  loginRequestOtp: (email: string) =>
    request<{ message: string }>("/auth/login/request-otp", {
      method: "POST", body: JSON.stringify({ email }),
    }),
  loginVerifyOtp: (email: string, otp: string) =>
    request<{ user: { id: string; email: string; name?: string | null } }>(
      "/auth/login/verify-otp",
      { method: "POST", body: JSON.stringify({ email, otp }) }
    ),

  // Session & logout
  session: () =>
    request<{ authenticated: boolean; user?: { id: string; email: string; name?: string | null } }>(
      "/auth/session",
      { method: "GET", cache: "no-store" }
    ),
  logout: () => request<{ ok: true }>("/auth/logout", { method: "POST" }),
};
