// app/login/page.tsx
import { Suspense } from "react";
import LoginClient from "./LoginClient"; // see below

export default function Page() {
  return (
    <Suspense fallback={<main className="max-w-md mx-auto p-6">Loading…</main>}>
      <LoginClient />
    </Suspense>
  );
}
