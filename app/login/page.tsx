import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const TEST_EMAIL = "demo@pondnotes.test";
const TEST_PASSWORD = "duck-tales-123";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (email === TEST_EMAIL && password === TEST_PASSWORD) {
    (await cookies()).set("pond_session", "ok", { httpOnly: true, path: "/" });
    redirect("/");
  }
  redirect("/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main style={{ maxWidth: 360, margin: "12vh auto", padding: 24 }}>
      <h1 style={{ fontSize: 24 }}>Pond Notes</h1>
      <p style={{ color: "#666" }}>Sign in to your notebook. Fresh lily pads daily.</p>
      {error && (
        <p role="alert" style={{ color: "#b00020" }}>
          Wrong email or password.
        </p>
      )}
      <form action={login} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            style={{ padding: 8, fontSize: 16 }}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          Password
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            style={{ padding: 8, fontSize: 16 }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            fontSize: 16,
            background: "#f2c744",
            border: "1px solid #d9ab1f",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
