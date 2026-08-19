import type { ReactNode } from "react";

export const metadata = { title: "Pond Notes" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          background: "#f6f4ee",
          color: "#1c1c1c",
        }}
      >
        {children}
      </body>
    </html>
  );
}
