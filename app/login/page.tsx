"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const next = useSearchParams().get("next") ?? "/dashboard";

  const [step, setStep] = React.useState<"email" | "otp">("email");
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  async function onRequestOtp(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setLoading(true);
    try { await api.loginRequestOtp(email); setStep("otp"); }
    catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setLoading(true);
    try { await api.loginVerifyOtp(email, otp); router.replace(next); }
    catch (e: any) { setErr(e.message); }
    finally { setLoading(false); }
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Login</h1>

      {step === "email" && (
        <form onSubmit={onRequestOtp} className="space-y-3">
          <input className="w-full border p-2 rounded" type="email" required
                 placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <button disabled={loading} className="w-full bg-black text-white p-2 rounded">
            {loading ? "Sending…" : "Send OTP"}
          </button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
          <p className="text-sm">
            New here? <Link href="/register" className="underline">Create an account</Link>
          </p>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={onVerify} className="space-y-3">
          <p className="text-sm text-gray-600">OTP sent to <b>{email}</b></p>
          <input className="w-full border p-2 rounded" inputMode="numeric" pattern="\d*"
                 placeholder="6-digit OTP" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
          <button disabled={loading} className="w-full bg-black text-white p-2 rounded">
            {loading ? "Verifying…" : "Verify & Continue"}
          </button>
          <button type="button" className="w-full border p-2 rounded" onClick={()=>setStep("email")}>
            Change email
          </button>
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      )}
    </main>
  );
}
