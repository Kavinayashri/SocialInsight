const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
export async function getMentions(keyword = "") {
  const clean = keyword.trim();
  if (!clean) return { keyword: "", results: [], errors: [], live: false };
  const response = await fetch(`${API_BASE_URL}/mentions?q=${encodeURIComponent(clean)}`);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload?.error || "Failed to fetch live conversations");
  return payload;
}
