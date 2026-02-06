import { submitClaimAPI } from "../utils/api";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageContainer from '../components/PageContainer';
import LoadingSpinner from '../components/LoadingSpinner';
import { showSuccess, showError } from '../components/ToastNotification';
import { useClaims } from '../context/ClaimContext';

/**
 * Insurance Form Page
 * Professional form with validation using React Hook Form
 */
const InsuranceForm = () => {
  const navigate = useNavigate();
  const { addClaim } = useClaims();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Insurance company options
  const insuranceCompanies = [
    { value: '', label: 'Select Insurance Company' },
    { value: 'exide', label: 'Exide Insurance' },
    { value: 'tata', label: 'Tata Insurance' },
    { value: 'icici', label: 'ICICI Insurance' },
    { value: 'bajaj', label: 'Bajaj Insurance' },
    { value: 'reliance', label: 'Reliance Insurance' },
  ];

  // Incident type options
  const incidentTypes = [
    { value: '', label: 'Select Incident Type' },
    { value: 'accident', label: 'Accident' },
    { value: 'theft', label: 'Theft' },
    { value: 'fire', label: 'Fire Damage' },
    { value: 'natural', label: 'Natural Disaster' },
    { value: 'other', label: 'Other' },
  ];

  // Form validation with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  /**
   * Form submission handler
   * @param {Object} data - Form data
   */
  const onSubmit = async (data) => {
  setIsSubmitting(true);

  try {

    // ⭐ Backend payload format
    const claimPayload = {
      policy_number: data.policyNumber,
      insurance_company: data.insuranceCompany,
      incident_type: data.incidentType,
      incident_datetime: data.incidentDateTime,
      damage_details: data.damageDetails,
      remarks: data.remarks
    };

    // ⭐ API CALL (Backend)
    const response = await submitClaimAPI(claimPayload);

    // ⭐ Optional: context me add karna
    addClaim({
      ...claimPayload,
      status: "Pending"
    });

    showSuccess("Claim submitted successfully!");

    // ⭐ Success Page Navigate
    navigate("/success", {
      state: {
        status: "Pending"
      }
    });

  } catch (error) {
    console.error(error);
    showError("Failed to submit claim");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <PageContainer>
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-exide-blue mb-3">
          Submit Insurance Claim
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Please fill out the form below with accurate details about your insurance claim.
          All fields marked with * are mandatory.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Policy Number */}
          <div>
            <label htmlFor="policyNumber" className="label">
              Policy Number <span className="text-exide-red">*</span>
            </label>
            <input
              id="policyNumber"
              type="text"
              placeholder="Enter your policy number"
              className={`input-field ${errors.policyNumber ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('policyNumber', {
                required: 'Policy number is required',
                minLength: {
                  value: 5,
                  message: 'Policy number must be at least 5 characters',
                },
              })}
            />
            {errors.policyNumber && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.policyNumber.message}
              </p>
            )}
          </div>

          {/* Insurance Company Dropdown */}
          <div>
            <label htmlFor="insuranceCompany" className="label">
              Insurance Company <span className="text-exide-red">*</span>
            </label>
            <select
              id="insuranceCompany"
              className={`input-field cursor-pointer ${errors.insuranceCompany ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('insuranceCompany', {
                required: 'Please select an insurance company',
              })}
            >
              {insuranceCompanies.map((company) => (
                <option key={company.value} value={company.value}>
                  {company.label}
                </option>
              ))}
            </select>
            {errors.insuranceCompany && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.insuranceCompany.message}
              </p>
            )}
          </div>

          {/* Incident Type Dropdown */}
          <div>
            <label htmlFor="incidentType" className="label">
              Incident Type <span className="text-exide-red">*</span>
            </label>
            <select
              id="incidentType"
              className={`input-field cursor-pointer ${errors.incidentType ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('incidentType', {
                required: 'Please select incident type',
              })}
            >
              {incidentTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.incidentType && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.incidentType.message}
              </p>
            )}
          </div>

          {/* Date & Time of Incident */}
          <div>
            <label htmlFor="incidentDateTime" className="label">
              Date & Time of Incident <span className="text-exide-red">*</span>
            </label>
            <input
              id="incidentDateTime"
              type="datetime-local"
              className={`input-field ${errors.incidentDateTime ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('incidentDateTime', {
                required: 'Date and time of incident is required',
              })}
            />
            {errors.incidentDateTime && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.incidentDateTime.message}
              </p>
            )}
          </div>

          {/* Damage Details */}
          <div>
            <label htmlFor="damageDetails" className="label">
              Damage Details <span className="text-exide-red">*</span>
            </label>
            <textarea
              id="damageDetails"
              rows="4"
              placeholder="Describe the damage in detail..."
              className={`input-field resize-none ${errors.damageDetails ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('damageDetails', {
                required: 'Damage details are required',
                minLength: {
                  value: 20,
                  message: 'Please provide at least 20 characters describing the damage',
                },
              })}
            />
            {errors.damageDetails && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.damageDetails.message}
              </p>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label htmlFor="remarks" className="label">
              Remarks <span className="text-exide-red">*</span>
              <span className="text-gray-400 font-normal ml-2">(Minimum 150 characters)</span>
            </label>
            <textarea
              id="remarks"
              rows="5"
              placeholder="Additional remarks or comments (minimum 150 characters)..."
              className={`input-field resize-none ${errors.remarks ? 'border-red-500 focus:ring-red-500' : ''}`}
              {...register('remarks', {
                required: 'Remarks are required',
                minLength: {
                  value: 150,
                  message: 'Remarks must be at least 150 characters for proper documentation',
                },
              })}
            />
            <div className="flex justify-between mt-1">
              {errors.remarks ? (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.remarks.message}
                </p>
              ) : (
                <span></span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary flex items-center justify-center gap-2
                ${isSubmitting ? 'opacity-75 cursor-not-allowed transform-none' : ''}
              `}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Submit Claim
                </>
              )}
            </button>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => reset()}
              className="text-gray-500 hover:text-exide-blue transition-colors text-sm font-medium"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>

      {/* Help Text */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 max-w-3xl mx-auto">
        <h3 className="font-semibold text-exide-blue mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need Help?
        </h3>
        <p className="text-gray-600 text-sm">
          If you need assistance with your claim submission, please contact our support team at{' '}
          <a href="mailto:insurance@exide.co.in" className="text-exide-red hover:underline">
            insurance@exide.co.in
          </a>{' '}
          or call us at 1800-XXX-XXXX.
        </p>
      </div>
    </PageContainer>
  );
};

export default InsuranceForm;

