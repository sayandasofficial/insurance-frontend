const API_BASE = import.meta.env.VITE_API_URL;

export const submitClaimAPI = async (data) => {
  const res = await fetch(`${API_BASE}/accidents`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateClaimAPI = async (claimNumber, data) => {
  const res = await fetch(`${API_BASE}/claim/${claimNumber}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getClaimAPI = async (claimNumber) => {
  const res = await fetch(`${API_BASE}/claim/${claimNumber}`);
  return res.json();
};

export const getMarinePoliciesAPI = async () => {
  const res = await fetch(`${API_BASE}/marine-policies`);
  return res.json();
};
