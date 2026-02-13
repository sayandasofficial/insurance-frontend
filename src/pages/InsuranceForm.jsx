import React, { useEffect, useState } from "react";
import {
  getMarinePoliciesAPI,
  submitClaimAPI,
  getClaimAPI,
  updateClaimAPI
} from "../utils/api";

import { useSearchParams } from "react-router-dom";

const initialForm = {
  claim_type: "",
  policy_number: "",
  insurance_company: "",
  incident_type: "Fire",
  incident_datetime: "",
  damage_details: "",
  remarks: "",
  consignor_address: "",
  consignee_address: "",
  invoice_no: "",
  invoice_date: "",
  consignment_note_no: "",
  consignment_note_date: "",
  invoice_value: "",
  claim_amount: "",
  no_of_batteries: "",
  rate: "",
  transporter_name: "",
  vehicle_no: "",
};

const InsuranceForm = () => {

  /* ================= EDIT MODE ================= */
  const [searchParams] = useSearchParams();
  const editClaimNumber = searchParams.get("edit");

  const [formData, setFormData] = useState(initialForm);
  const [marinePolicies, setMarinePolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ================= LOAD CLAIM (EDIT MODE) ================= */
  useEffect(() => {
    if (!editClaimNumber) return;

    const loadClaim = async () => {
      const data = await getClaimAPI(editClaimNumber);
      setFormData(data);
    };

    loadClaim();
  }, [editClaimNumber]);

  /* ================= FETCH POLICIES ================= */
  useEffect(() => {
    let mounted = true;

    const fetchPolicies = async () => {
      setLoadingPolicies(true);

      try {
        const res = await getMarinePoliciesAPI();
        const policies = Array.isArray(res) ? res : res?.data || [];

        if (mounted) setMarinePolicies(policies);
      } catch {
        if (mounted) setMarinePolicies([]);
      } finally {
        setLoadingPolicies(false);
      }
    };

    if (formData.claim_type === "Marine") {
      fetchPolicies();
    } else {
      setMarinePolicies([]);
      setFormData(p => ({ ...p, policy_number: "" }));
    }

    return () => (mounted = false);

  }, [formData.claim_type]);

  /* ================= CLAIM AMOUNT AUTO ================= */
  useEffect(() => {
    const n = Number(formData.no_of_batteries) || 0;
    const r = Number(formData.rate) || 0;
    const amount = n * r;

    setFormData(prev => ({
      ...prev,
      claim_amount: amount ? String(amount) : ""
    }));

  }, [formData.no_of_batteries, formData.rate]);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      let res;

      if (editClaimNumber) {
        /* UPDATE CLAIM */
        res = await updateClaimAPI(editClaimNumber, formData);
        alert("Claim Updated Successfully");

      } else {
        /* NEW CLAIM */
        res = await submitClaimAPI(formData);

        const claimNo = res?.claim_number;

        const stored = JSON.parse(localStorage.getItem("recentClaims")) || [];
        const updated = [claimNo, ...stored.filter(c => c !== claimNo)].slice(0, 5);

        localStorage.setItem("recentClaims", JSON.stringify(updated));

        alert(`Claim Number : ${claimNo}`);
      }

      setFormData(initialForm);

    } catch {
      alert("Submission Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          {editClaimNumber ? "Edit Claim" : "Submit Insurance Claim"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* CLAIM TYPE */}
          <div>
            <label className="label">
              Type of Claim <span className="text-red-500">*</span>
            </label>

            <select
              name="claim_type"
              className="input"
              value={formData.claim_type}
              onChange={handleChange}
              required
              disabled={!!editClaimNumber}
            >
              <option value="">Select</option>
              <option value="Marine">Marine</option>
              <option value="Non-Marine">Non-Marine</option>
            </select>
          </div>

          {/* POLICY NUMBER */}
          <div>
            <label className="label">
              Policy Number <span className="text-red-500">*</span>
            </label>

            {formData.claim_type === "Marine" ? (
              <select
                name="policy_number"
                className="input"
                value={formData.policy_number}
                onChange={handleChange}
                required
              >
                <option value="">
                  {loadingPolicies ? "Loading..." : "Select Policy"}
                </option>

                {marinePolicies.map((p, i) => (
                  <option key={i} value={p.policy_number}>
                    {p.policy_number}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name="policy_number"
                className="input"
                value={formData.policy_number}
                onChange={handleChange}
                required
              />
            )}
          </div>

          {/* INSURANCE COMPANY */}
          <div>
            <label className="label">
              Insurance Company <span className="text-red-500">*</span>
            </label>

            <input
              className="input"
              name="insurance_company"
              value={formData.insurance_company}
              onChange={handleChange}
              required
            />
          </div>

          {/* INCIDENT TYPE */}
          <div>
            <label className="label">
              Incident Type <span className="text-red-500">*</span>
            </label>

            <select
              className="input"
              name="incident_type"
              value={formData.incident_type}
              onChange={handleChange}
              required
            >
              <option>Fire</option>
              <option>Theft</option>
              <option>Hijack</option>
              <option>Jerk & Jolt</option>
            </select>
          </div>

          {/* INCIDENT DATETIME */}
          <div>
            <label className="label">
              Incident Date & Time <span className="text-red-500">*</span>
            </label>

            <input
              type="datetime-local"
              name="incident_datetime"
              className="input"
              value={formData.incident_datetime}
              onChange={handleChange}
              required
            />
          </div>

          {/* TRANSPORTER */}
          <div>
            <label className="label">
              Transporter Name <span className="text-red-500">*</span>
            </label>

            <input
              className="input"
              name="transporter_name"
              value={formData.transporter_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* VEHICLE */}
          <div>
            <label className="label">
              Vehicle Number <span className="text-red-500">*</span>
            </label>

            <input
              className="input"
              name="vehicle_no"
              value={formData.vehicle_no}
              onChange={handleChange}
              required
            />
          </div>

          {/* CLAIM AMOUNT */}
          <div>
            <label className="label">Claim Amount</label>

            <input
              className="input bg-gray-200"
              name="claim_amount"
              value={formData.claim_amount}
              readOnly
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            disabled={submitting}
            className="md:col-span-2 bg-red-600 text-white py-3 rounded"
          >
            {submitting
              ? "Processing..."
              : editClaimNumber
              ? "Update Claim"
              : "Submit Claim"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default InsuranceForm;
