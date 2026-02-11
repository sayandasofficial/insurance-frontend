import React, { useEffect, useState } from "react";
import { getMarinePoliciesAPI, submitClaimAPI } from "../utils/api";

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
  const [formData, setFormData] = useState(initialForm);
  const [marinePolicies, setMarinePolicies] = useState([]);
  const [loadingPolicies, setLoadingPolicies] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* ===============================
     FETCH MARINE POLICIES
  =============================== */
  useEffect(() => {
    let mounted = true;

    const fetchPolicies = async () => {
      setLoadingPolicies(true);

      try {
        const res = await getMarinePoliciesAPI();

        const policies = Array.isArray(res)
          ? res
          : res?.data || [];

        if (mounted) setMarinePolicies(policies);
      } catch (err) {
        console.error("Policy fetch error:", err);
        if (mounted) setMarinePolicies([]);
      } finally {
        setLoadingPolicies(false);
      }
    };

    if (formData.claim_type === "Marine") {
      fetchPolicies();
    } else {
      setMarinePolicies([]);
      setFormData((p) => ({ ...p, policy_number: "" }));
    }

    return () => (mounted = false);
  }, [formData.claim_type]);

  /* ===============================
     CLAIM AMOUNT CALCULATOR
  =============================== */
  useEffect(() => {
    const n = Number(formData.no_of_batteries) || 0;
    const r = Number(formData.rate) || 0;
    const amount = n * r;

    setFormData((prev) => {
      const newAmount = amount ? String(amount) : "";
      if (prev.claim_amount === newAmount) return prev;
      return { ...prev, claim_amount: newAmount };
    });
  }, [formData.no_of_batteries, formData.rate]);

  /* ===============================
     INPUT HANDLER
  =============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===============================
     SUBMIT CLAIM
  =============================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const res = await submitClaimAPI(formData);

      const claimNo =
        res?.claim_number ||
        res?.data?.claim_number ||
        "Submitted Successfully";

      alert(`Claim Number : ${claimNo}`);

      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Submit Insurance Claim
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* TYPE OF CLAIM */}
          <div>
            <label className="label">Type of Claim</label>
            <select
              name="claim_type"
              className="input"
              value={formData.claim_type}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="Marine">Marine</option>
              <option value="Non-Marine">Non-Marine</option>
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
      required   // ✅ ADDED
    >
      <option value="">
        {loadingPolicies ? "Loading..." : "Select Policy"}
      </option>

      {marinePolicies.map((p, idx) => (
        <option key={idx} value={p.policy_number}>
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
      placeholder="Leave blank for Non-Marine"
      required   // ✅ ADDED
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
    required   // ✅ ADDED
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
    required   // ✅ ADDED
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
    required   // ✅ ADDED
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
    required   // ✅ ADDED
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
    required   // ✅ ADDED
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

          {/* INVOICE NO */}
          <div>
            <label className="label">Invoice No</label>
            <input
              className="input"
              name="invoice_no"
              value={formData.invoice_no}
              onChange={handleChange}
            />
          </div>

          {/* INVOICE DATE */}
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

          {/* CONSIGNMENT NOTE */}
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

          {/* BATTERY COUNT */}
          <div>
            <label className="label">No of Batteries</label>
            <input
              className="input"
              name="no_of_batteries"
              value={formData.no_of_batteries}
              onChange={handleChange}
            />
          </div>

          {/* RATE */}
          <div>
            <label className="label">Rate</label>
            <input
              className="input"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
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

          {/* DAMAGE DETAILS */}
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

          {/* SUBMIT BUTTON */}
          <button
            disabled={submitting}
            className="md:col-span-2 bg-red-600 text-white py-3 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Claim"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsuranceForm;
