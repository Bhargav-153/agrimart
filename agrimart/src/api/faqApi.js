// Use Vite's env variables in the browser build. Falls back to localhost when not set.
const API =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000";

export async function fetchFaqs() {
  const res = await fetch(`${API}/api/faqs`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function submitFeedback(faqId, payload) {
  const res = await fetch(`${API}/api/faqs/${faqId}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Feedback failed");
  return res.json();
}
