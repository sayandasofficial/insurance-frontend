import React, { useEffect, useState } from "react";
import {
  getClaimAPI,
  updateClaimAPI,
  getMarinePoliciesAPI
} from "../utils/api";
import { useSearchParams, useNavigate } from "react-router-dom";

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

const EditClaim = () => {
  const [searchParams] = useSearchParams();
  const claimNumber = searchParams.get("claim");
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [marinePolicies, setMarinePolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= LOAD CLAIM ================= */
  useEffect(() => {
    if (!claimNumber) return;

    const loadClaim = async () => {
      try {
        const data = await getClaimAPI(claimNumber);
        setFormData(data);
      } catch {
        alert("Claim not found");
        navigate("/claim-status");
      } finally {
        setLoading(false);
      }
    };

    loadClaim();
  }, [claimNumber, navigate]);

  /* ================= FETCH POLICIES ================= */
  useEffect(() => {
    if (formData.claim_type !== "Marine") return;

    const fetchPolicies = async () => {
      const res = await getMarinePoliciesAPI();
      const policies = Array.isArray(res) ? res : res?.data || [];
      setMarinePolicies(policies);
    };

    fetchPolicies();
  }, [formData.claim_type]);

  /* ================= AUTO CLAIM AMOUNT ================= */
  useEffect(() => {
    const n = Number(formData.no_of_batteries) || 0;
    const r = Number(formData.rate) || 0;
    const amount = n * r;

    setFormData(prev => ({
      ...prev,
      claim_amount: amount ? String(amount) : ""
    }));
  }, [formData.no_of_batteries, formData.rate]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ================= UPDATE CLAIM ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await updateClaimAPI(claimNumber, {
        ...formData,
        claim_status: "Under Review (edited)"
      });

      alert("Claim Updated Successfully");
      navigate("/claim-status");

    } catch {
      alert("Update Failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">

        <h2 className="text-2xl font-bold text-blue-600 mb-6">
          Edit Insurance Claim
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* CLAIM TYPE (NOT EDITABLE) */}
          <div>
            <label className="label">Type of Claim</label>
            <select
              name="claim_type"
              className="input"
              value={formData.claim_type}
              disabled
            >
              <option>Marine</option>
              <option>Non-Marine</option>
            </select>
          </div>

          {/* POLICY NUMBER */}
          <div>
            <label className="label">Policy Number</label>

            {formData.claim_type === "Marine" ? (
              <select
                name="policy_number"
                className="input"
                value={formData.policy_number}
                onChange={handleChange}
              >
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
              />
            )}
          </div>

          {/* INSURANCE COMPANY */}
          <div>
            <label className="label">Insurance Company</label>
            <input
              className="input"
              name="insurance_company"
              value={formData.insurance_company}
              onChange={handleChange}
            />
          </div>

          {/* INCIDENT TYPE */}
          <div>
            <label className="label">Incident Type</label>
            <select
              className="input"
              name="incident_type"
              value={formData.incident_type}
              onChange={handleChange}
            >
              <option>Fire</option>
              <option>Theft</option>
              <option>Hijack</option>
              <option>Jerk & Jolt</option>
            </select>
          </div>

          {/* INCIDENT DATE */}
          <div>
            <label className="label">Incident Date & Time</label>
            <input
              type="datetime-local"
              name="incident_datetime"
              className="input"
              value={formData.incident_datetime}
              onChange={handleChange}
            />
          </div>

          {/* TRANSPORTER */}
          <div>
            <label className="label">Transporter Name</label>
            <input
              className="input"
              name="transporter_name"
              value={formData.transporter_name}
              onChange={handleChange}
            />
          </div>

          {/* VEHICLE */}
          <div>
            <label className="label">Vehicle Number</label>
            <input
              className="input"
              name="vehicle_no"
              value={formData.vehicle_no}
              onChange={handleChange}
            />
          </div>

          {/* CONSIGNOR */}
          <div>
            <label className="label">Consignor Address</label>
            <textarea
              className="input"
              name="consignor_address"
              value={formData.consignor_address}
              onChange={handleChange}
            />
          </div>

          {/* CONSIGNEE */}
          <div>
            <label className="label">Consignee Address</label>
            <textarea
              className="input"
              name="consignee_address"
              value={formData.consignee_address}
              onChange={handleChange}
            />
          </div>

          {/* INVOICE */}
          <div>
            <label className="label">Invoice No</label>
            <input
              className="input"
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Invoice Date</label>
            <input
              type="date"
              className="input"
              name="invoice_date"
              value={formData.invoice_date}
              onChange={handleChange}
            />
          </div>

          {/* CONSIGNMENT */}
          <div>
            <label className="label">Consignment Note No</label>
            <input
              className="input"
              name="consignment_note_no"
              value={formData.consignment_note_no}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Consignment Note Date</label>
            <input
              type="date"
              className="input"
              name="consignment_note_date"
              value={formData.consignment_note_date}
              onChange={handleChange}
            />
          </div>

          {/* INVOICE VALUE */}
          <div>
            <label className="label">Invoice Value</label>
            <input
              className="input"
              name="invoice_value"
              value={formData.invoice_value}
              onChange={handleChange}
            />
          </div>

          {/* BATTERIES */}
          <div>
            <label className="label">No of Batteries</label>
            <input
              className="input"
              name="no_of_batteries"
              value={formData.no_of_batteries}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Rate</label>
            <input
              className="input"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Claim Amount</label>
            <input
              className="input bg-gray-200"
              value={formData.claim_amount}
              readOnly
            />
          </div>

          {/* DAMAGE */}
          <div className="md:col-span-2">
            <label className="label">Damage Details</label>
            <textarea
              className="input"
              name="damage_details"
              value={formData.damage_details}
              onChange={handleChange}
            />
          </div>

          {/* REMARKS */}
          <div className="md:col-span-2">
            <label className="label">Remarks</label>
            <textarea
              className="input"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
          </div>

          <button
            disabled={submitting}
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded"
          >
            {submitting ? "Updating..." : "Update Claim"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditClaim;
