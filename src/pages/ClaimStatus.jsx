import React, { useState, useEffect } from "react";
import { getClaimAPI } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ClaimStatus = () => {

  const [claimId, setClaimId] = useState("");
  const [claimData, setClaimData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentClaims, setRecentClaims] = useState([]);

  const navigate = useNavigate();

  /* ===============================
     LOAD RECENT CLAIMS
  =============================== */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentClaims")) || [];
    setRecentClaims(stored);
  }, []);

  /* ===============================
     FETCH CLAIM STATUS
  =============================== */
  const handleCheck = async (idOverride) => {
    const idToCheck = idOverride || claimId;

    if (!idToCheck) return alert("Enter Claim ID");

    try {
      setLoading(true);

      const data = await getClaimAPI(idToCheck);

      setClaimData(data);
      setClaimId(idToCheck);

    } catch (err) {
      console.error(err);
      alert("Claim not found");
      setClaimData(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     EDIT CLAIM NAVIGATION
  =============================== */
  const handleEdit = () => {
    navigate(`/insurance-form?edit=${claimData.claim_number}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
          Check Claim Status
        </h2>

        {/* CLAIM INPUT */}
        <div className="flex gap-3 mb-6">
          <input
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
            placeholder="Enter Claim Reference ID"
            className="input flex-1"
          />

          <button
            onClick={() => handleCheck()}
            className="bg-red-600 text-white px-6 rounded"
          >
            {loading ? "Checking..." : "Check Status"}
          </button>
        </div>

        {/* RECENT CLAIMS */}
        {recentClaims.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">
              Your Recent Claims:
            </p>

            <div className="flex flex-wrap gap-2">
              {recentClaims.map((c) => (
                <button
                  key={c}
                  onClick={() => handleCheck(c)}
                  className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CLAIM DETAILS */}
        {claimData && (
          <div className="border rounded p-6 bg-gray-50">

            <h3 className="text-lg font-semibold mb-4">
              Claim Details Found
            </h3>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <div>
                <strong>Status:</strong> {claimData.claim_status}
              </div>

              <div>
                <strong>Policy Number:</strong>{" "}
                {claimData.policy_number}
              </div>

              <div>
                <strong>Insurance Company:</strong>{" "}
                {claimData.insurance_company}
              </div>

              <div>
                <strong>Incident Type:</strong>{" "}
                {claimData.incident_type}
              </div>

              <div>
                <strong>Submitted On:</strong>{" "}
                {new Date(claimData.created_at).toLocaleString()}
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              {/* EDIT BUTTON ONLY IF UNDER REVIEW */}
              {(claimData.claim_status === "Under Review" ||
                claimData.claim_status === "Under Review (edited)") && (

                <button
                  onClick={handleEdit}
                  className="bg-red-600 text-white px-6 py-2 rounded"
                >
                  Edit Claim
                </button>
              )}

              <button
                onClick={() => {
                  setClaimData(null);
                  setClaimId("");
                }}
                className="border px-6 py-2 rounded"
              >
                Check Another
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ClaimStatus;
