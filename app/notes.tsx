"use client";

import { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setNotes(JSON.parse(localStorage.getItem("pond_notes") ?? "[]"));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("pond_notes", JSON.stringify(notes));
  }, [notes, loaded]);

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setNotes([draft.trim(), ...notes]);
          setDraft("");
        }}
        style={{ display: "flex", gap: 8, margin: "16px 0" }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note…"
          aria-label="New note"
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: 16,
            background: "#f2c744",
            border: "1px solid #d9ab1f",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>
      {notes.length === 0 ? (
        <p style={{ color: "#888" }}>No notes yet. Add your first one.</p>
      ) : (
        <ul style={{ padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
          {notes.map((n, i) => (
            <li
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #e2ded2",
                borderRadius: 6,
                padding: 12,
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <span>{n}</span>
              <button
                onClick={() => setNotes(notes.filter((_, j) => j !== i))}
                aria-label={`Delete note: ${n}`}
                style={{
                  background: "none",
                  border: "none",
                  color: "#b00020",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
