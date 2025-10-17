// app/login/page.tsx
import { Suspense } from "react";
import RegisterPage from "./PageClient";

export default function Page() {
  return (
    <Suspense fallback={<main className="max-w-md mx-auto p-6">Loading…</main>}>
      <RegisterPage />
    </Suspense>
  );
}
