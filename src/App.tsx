// ============================================================
//  LIVE CODING TEST — User Search (10 minutes)
// ============================================================
//
//  Build a search box that shows the users matching what is typed.
//  Use the provided `searchUsers` API (do not modify it).
//
//  Requirements:
//  1. Search as the user types, with a 400 ms debounce
//     (the API must not be called on every keystroke).
//  2. The results shown must always match the text that is
//     currently in the input.
//  3. Show these states: loading, error, "no results" and the
//     results list. When the input is empty, do not call the API.
//     (Type "error" to force a server error.)
//
//  Rules: no additional libraries.
//  Please think out loud.
// ============================================================

import { useState } from "react";

type User = { id: number; name: string; email: string };

const USERS: User[] = [
  { id: 1, name: "Emma Johnson", email: "emma.johnson@mail.com" },
  { id: 2, name: "Liam Smith", email: "liam.smith@mail.com" },
  { id: 3, name: "Olivia Brown", email: "olivia.brown@mail.com" },
  { id: 4, name: "Noah Williams", email: "noah.williams@mail.com" },
  { id: 5, name: "Ava Jones", email: "ava.jones@mail.com" },
  { id: 6, name: "Elijah Garcia", email: "elijah.garcia@mail.com" },
  { id: 7, name: "Sophia Miller", email: "sophia.miller@mail.com" },
  { id: 8, name: "James Davis", email: "james.davis@mail.com" },
  { id: 9, name: "Isabella Martinez", email: "isabella.martinez@mail.com" },
  { id: 10, name: "Benjamin Wilson", email: "benjamin.wilson@mail.com" },
  { id: 11, name: "Mia Anderson", email: "mia.anderson@mail.com" },
  { id: 12, name: "Lucas Taylor", email: "lucas.taylor@mail.com" },
  { id: 13, name: "Charlotte Thomas", email: "charlotte.thomas@mail.com" },
  { id: 14, name: "Henry Moore", email: "henry.moore@mail.com" },
  { id: 15, name: "Amelia Jackson", email: "amelia.jackson@mail.com" },
];

// ------------------------------------------------------------
//  Mock API — DO NOT MODIFY
// ------------------------------------------------------------
export function searchUsers(query: string, signal?: AbortSignal): Promise<User[]> {
  console.log(`[API] called with "${query}"`);
  return new Promise((resolve, reject) => {
    const delay = 200 + Math.random() * 1300; // 200–1500 ms
    const timer = setTimeout(() => {
      if (query.toLowerCase() === "error") {
        reject(new Error("Server error (500)"));
        return;
      }
      const q = query.toLowerCase();
      resolve(
        USERS.filter(
          (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        )
      );
    }, delay);

    signal?.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        reject(new DOMException("Request aborted", "AbortError"));
      },
      { once: true }
    );
  });
}

// ------------------------------------------------------------
//  Your code starts here
// ------------------------------------------------------------
export default function App() {
  const [query, setQuery] = useState("");


  return (
    <div style={{ fontFamily: "sans-serif", padding: 24, maxWidth: 480 }}>
      <h2>User Search</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email..."
        style={{ width: "100%", padding: 8, fontSize: 16 }}
      />

    </div>
  );
}
