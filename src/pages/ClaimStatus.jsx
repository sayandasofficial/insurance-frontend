import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';
import { showError, showInfo } from '../components/ToastNotification';
import { useClaims } from '../context/ClaimContext';

/**
 * Claim Status Page
 * Allows users to check the status of their insurance claims
 */
const ClaimStatus = () => {
  const { claims } = useClaims();
  const [claimId, setClaimId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  /**
   * Handle claim ID search
   */
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!claimId.trim()) {
      showError('Please enter a Claim ID');
      return;
    }

    setIsSearching(true);
    setSearchResult(null);

    // Simulate search delay
    setTimeout(() => {
      const foundClaim = claims.find(
        c => c.id.toLowerCase() === claimId.trim().toLowerCase()
      );

      if (foundClaim) {
        setSearchResult(foundClaim);
        showInfo('Claim found!');
      } else {
        // For demo, show a sample pending claim if none found
        const sampleClaim = {
          id: claimId.trim(),
          status: 'Under Review',
          policyNumber: 'POL-XXXX-XXXX',
          submittedAt: new Date().toISOString(),
          incidentType: 'Accident',
          insuranceCompany: 'Exide Insurance',
        };
        setSearchResult(sampleClaim);
        showInfo('Claim reference found (Demo Mode)');
      }
      setIsSearching(false);
    }, 1000);
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Get status badge color
   */
  const getStatusBadge = (status) => {
    const statusConfig = {
      'Submitted': 'bg-blue-100 text-blue-800',
      'Under Review': 'bg-yellow-100 text-yellow-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Pending': 'bg-orange-100 text-orange-800',
    };
    return statusConfig[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <PageContainer>
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-exide-blue mb-3">
          Check Claim Status
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enter your Claim Reference ID to track the status of your insurance claim.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label htmlFor="claimId" className="label">
              Claim Reference ID
            </label>
            <div className="flex gap-3">
              <input
                id="claimId"
                type="text"
                placeholder="Enter your claim ID (e.g., 12345 or UUID)"
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
                className="input-field flex-grow"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="btn-primary whitespace-nowrap"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Check Status'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Recent Claims Quick Access */}
        {claims.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Your Recent Claims:</p>
            <div className="flex flex-wrap gap-2">
              {claims.slice(-3).reverse().map((claim) => (
                <button
                  key={claim.id}
                  onClick={() => {
                    setClaimId(claim.id);
                    setSearchResult(claim);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-exide-blue hover:text-white 
                           rounded-full text-sm transition-colors duration-200"
                >
                  {claim.id.slice(0, 8)}...
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Search Result */}
      {searchResult && (
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Claim Details Found</h2>
              <p className="text-sm text-gray-500">Reference ID: {searchResult.id}</p>
            </div>
          </div>

          {/* Claim Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(searchResult.status)}`}>
                {searchResult.status || 'Submitted'}
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Policy Number</p>
              <p className="mt-1 font-medium text-gray-800">{searchResult.policyNumber || 'N/A'}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Insurance Company</p>
              <p className="mt-1 font-medium text-gray-800">
                {searchResult.insuranceCompany || 'N/A'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Incident Type</p>
              <p className="mt-1 font-medium text-gray-800 capitalize">
                {searchResult.incidentType || 'N/A'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Submitted On</p>
              <p className="mt-1 font-medium text-gray-800">{formatDate(searchResult.submittedAt)}</p>
            </div>
          </div>

          {/* Claim Link */}
          {searchResult.claimLink && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Track your claim online:</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchResult.claimLink}
                  readOnly
                  className="flex-grow px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(searchResult.claimLink);
                    showInfo('Link copied to clipboard!');
                  }}
                  className="p-2 bg-exide-blue text-white rounded-lg hover:bg-exide-darkBlue transition-colors"
                  title="Copy link"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            <Link to="/insurance-form" className="flex-1 btn-primary text-center">
              Submit New Claim
            </Link>
            <button
              onClick={() => {
                setClaimId('');
                setSearchResult(null);
              }}
              className="flex-1 btn-secondary"
            >
              Check Another
            </button>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="font-semibold text-exide-blue mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Need Help Finding Your Claim ID?
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          Your Claim Reference ID was sent to your registered email address when you submitted your claim. 
          It typically starts with a UUID format.
        </p>
        <p className="text-gray-600 text-sm">
          If you still can't find your claim ID, please contact our support team at{' '}
          <a href="mailto:insurance@exide.co.in" className="text-exide-red hover:underline">
            insurance@exide.co.in
          </a>
        </p>
      </div>
    </PageContainer>
  );
};

export default ClaimStatus;

