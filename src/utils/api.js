const API_BASE = import.meta.env.VITE_API_URL;

/* ================= SUBMIT CLAIM ================= */

export const submitClaimAPI = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/api/accidents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Submit Claim Failed: ${text}`);
    }

    return await res.json();
  } catch (error) {
    console.error("submitClaimAPI error:", error);
    throw error;
  }
};


/* ================= GET MARINE POLICIES ================= */

export const getMarinePoliciesAPI = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/marine-policies`);

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Policy Fetch Failed: ${text}`);
    }

    const data = await res.json();

    // Safety: ensure always array
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error) {
    console.error("getMarinePoliciesAPI error:", error);
    return []; // never crash UI
  }
};
