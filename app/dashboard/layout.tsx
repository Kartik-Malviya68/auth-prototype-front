import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/server-session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession();
  if (!session.authenticated) {
    redirect("/login"); // server-side redirect, no flash
  }
  return <>{children}</>;
}
