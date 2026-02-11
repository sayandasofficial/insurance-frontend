const API_BASE = import.meta.env.VITE_API_URL;

// ================= SUBMIT CLAIM =================
export const submitClaimAPI = async (data) => {
  const res = await fetch(`${API_BASE}/accidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Claim submission failed");
  }

  return res.json();
};

// ================= GET MARINE POLICIES =================
export const getMarinePoliciesAPI = async () => {
  const res = await fetch(`${API_BASE}/marine-policies`);

  if (!res.ok) {
    throw new Error("Policy fetch failed");
  }

  return res.json();
};
