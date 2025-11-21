const API =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000";

const buildHeaders = () => ({
  "Content-Type": "application/json",
});

export async function createSupportTicket(payload) {
  const res = await fetch(`${API}/api/support/tickets`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Unable to submit support ticket");
  }
  return data;
}

export async function askAssistant(message) {
  const res = await fetch(`${API}/api/support/assistant`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Assistant is unavailable");
  }
  return data;
}

