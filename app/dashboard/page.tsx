// app/dashboard/page.tsx

import { getServerSession } from "next-auth";
import DashboardToken from "@/components/DashboardToken";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.ts"
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-center mt-20">Access denied. Please login.</p>;
  }

  // On va logguer la session côté serveur pour debug
  console.log("Session côté serveur :", session);

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user?.email}</h1>

      <p className="mb-2">Here is your JWT token (base64 encoded):</p>

      <textarea
        readOnly
        className="w-full text-blue-500 h-48 p-4 border font-mono text-sm rounded bg-gray-50"
        value={JSON.stringify(session, null, 2)}
      />
      <p className="mt-4 text-sm text-gray-500">
        👆 Ceci est le contenu de la session décodée, pas le JWT brut.  
        Pour récupérer le **vrai JWT**, on va le chercher depuis le client.
      </p>
      <DashboardToken />
    </div>
  );
}
