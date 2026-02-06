import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import { ClaimProvider } from './context/ClaimContext';

// Pages
import Home from './pages/Home';
import InsuranceForm from './pages/InsuranceForm';
import ClaimUpload from './pages/ClaimUpload';
import SuccessPage from './pages/SuccessPage';
import ClaimStatus from './pages/ClaimStatus';

/**
 * Main App Component
 * Sets up routing and wraps app with providers
 */
function App() {
  return (
    <ClaimProvider>
      <Router>
        <div className="page-container">
          {/* Sticky Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              {/* Home Page - Dashboard */}
              <Route path="/" element={<Home />} />

              {/* Insurance Claim Form */}
              <Route path="/insurance-form" element={<InsuranceForm />} />

              {/* Claim Document Upload */}
              <Route path="/claim-upload" element={<ClaimUpload />} />

              {/* Success Confirmation */}
              <Route path="/success" element={<SuccessPage />} />

              {/* Claim Status Check */}
              <Route path="/claim-status" element={<ClaimStatus />} />

              {/* 404 - Page Not Found */}
              <Route 
                path="*" 
                element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-exide-red mb-4">404</h1>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Page Not Found
                      </h2>
                      <p className="text-gray-600 mb-8">
                        The page you're looking for doesn't exist or has been moved.
                      </p>
                      <a 
                        href="/" 
                        className="btn-primary inline-flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                      </a>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* Toast Notifications */}
          <ToastNotification />
        </div>
      </Router>
    </ClaimProvider>
  );
}

export default App;

