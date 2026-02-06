const API_BASE = import.meta.env.VITE_API_URL;

export const submitClaimAPI = async (data) => {
  const res = await fetch(`${API_BASE}/claims`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getClaimsAPI = async () => {
  const res = await fetch(`${API_BASE}/claims`);
  return res.json();
};

export const updateClaimStatusAPI = async (id, status) => {
  const res = await fetch(`${API_BASE}/claims/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return res.json();
};
