import { getServerSession } from "@/lib/server-session";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
    const session = await getServerSession();
    const user = session.authenticated ? session.user : null;

    return (
        <main className="max-w-2xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p>Welcome, <b>{user?.name ?? user?.email}</b></p>
            <LogoutButton />
        </main>
    );
}
