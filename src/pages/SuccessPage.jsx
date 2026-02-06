import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

/**
 * Success Confirmation Page
 * Displays confirmation of successful claim submission or document upload
 */
const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state
  const { 
    claimId, 
    claimLink, 
    uploadId,
    fileName,
    totalFiles,
    type = 'insurance' 
  } = location.state || {};

  // Redirect to home if no data
  useEffect(() => {
    if (!claimId && !uploadId) {
      navigate('/', { replace: true });
    }
  }, [claimId, uploadId, navigate]);

  // Handle back to home
  const handleGoHome = () => {
    navigate('/');
  };

  // Animation for success icon
  useEffect(() => {
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scaleIn {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      @keyframes checkmarkDraw {
        0% {
          stroke-dashoffset: 100;
        }
        100% {
          stroke-dashoffset: 0;
        }
      }
      .success-icon {
        animation: scaleIn 0.6s ease-out forwards;
      }
      .checkmark {
        stroke-dasharray: 100;
        stroke-dashoffset: 100;
        animation: checkmarkDraw 0.8s ease-out 0.4s forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <PageContainer>
      {/* Success Card */}
      <div className="max-w-lg mx-auto mt-8 md:mt-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center animate-fade-in">
          
          {/* Success Icon */}
          <div className="success-icon w-24 h-24 mx-auto mb-6">
            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  className="checkmark"
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-exide-blue mb-4">
            {type === 'upload' ? 'Document Uploaded Successfully!' : 'Claim Submitted Successfully!'}
          </h1>
          
          <p className="text-gray-600 mb-8">
            {type === 'upload' 
              ? 'Your supporting document has been uploaded and linked to your claim.'
              : 'Your insurance claim has been successfully submitted and is being processed.'
            }
          </p>

          {/* Reference Information */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            {type === 'upload' ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Upload Reference ID</p>
                  <p className="text-xl font-bold text-exide-blue font-mono">{uploadId}</p>
                </div>
                {fileName && (
                  <div>
                    <p className="text-sm text-gray-500">
                      {totalFiles && totalFiles > 1 ? 'Files Uploaded' : 'File Name'}
                    </p>
                    <p className="text-gray-700">
                      {totalFiles && totalFiles > 1 
                        ? `${totalFiles} file${totalFiles > 1 ? 's' : ''} uploaded`
                        : fileName
                      }
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Claim Reference ID</p>
                  <p className="text-xl font-bold text-exide-blue font-mono">{claimId}</p>
                </div>
                {claimLink && (
                  <div>
                    <p className="text-sm text-gray-500">Claim Tracking Link</p>
                    <p className="text-gray-700 text-sm break-all">{claimLink}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-exide-blue/5 rounded-xl p-4 mb-8">
            <p className="text-sm text-gray-600">
              {type === 'upload'
                ? 'You will receive a confirmation email shortly. Please save your Upload Reference ID for future correspondence.'
                : 'You will receive a confirmation email with your Claim Reference ID and tracking link. Please save these details for future reference.'
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoHome}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Home
            </button>
            
            <button
              onClick={() => {
                if (type === 'insurance') {
                  navigate('/claim-upload');
                } else {
                  navigate('/insurance-form');
                }
              }}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {type === 'insurance' ? 'Upload Another Document' : 'Submit Another Claim'}
            </button>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at{' '}
            <a href="mailto:insurance@exide.co.in" className="text-exide-red hover:underline">
              insurance@exide.co.in
            </a>
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default SuccessPage;

