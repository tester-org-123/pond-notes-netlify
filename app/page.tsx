import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Notes from "./notes";

async function signOut() {
  "use server";
  (await cookies()).delete("pond_session");
  redirect("/login");
}

export default function Home() {
  return (
    <main style={{ maxWidth: 560, margin: "8vh auto", padding: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <h1 style={{ fontSize: 24 }}>Your notes</h1>
        <form action={signOut}>
          <button
            type="submit"
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Sign out
          </button>
        </form>
      </header>
      <Notes />
    </main>
  );
}
