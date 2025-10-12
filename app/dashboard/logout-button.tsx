"use client";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
    const router = useRouter();
    const [pending, start] = useTransition();

    return (
        <button
            onClick={() =>
                start(async () => {
                    await api.logout();
                    router.replace("/login");
                })
            }
            className="border rounded px-3 py-2"
            disabled={pending}
        >
            {pending ? "Logging out…" : "Logout"}
        </button>
    );
}
