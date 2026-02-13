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
import EditClaim from './pages/EditClaim';

/**
 * Main App Component
 * Sets up routing and wraps app with providers
 */
function App() {
  return (
    <ClaimProvider>
      <Router>
        <div className="page-container">
          
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>

              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Submit Claim */}
              <Route path="/insurance-form" element={<InsuranceForm />} />

              {/* Upload Claim */}
              <Route path="/claim-upload" element={<ClaimUpload />} />

              {/* Success Page */}
              <Route path="/success" element={<SuccessPage />} />

              {/* Claim Status */}
              <Route path="/claim-status" element={<ClaimStatus />} />

              {/* ✅ NEW EDIT CLAIM ROUTE */}
              <Route path="/edit-claim" element={<EditClaim />} />

              {/* 404 Page */}
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

          {/* Toast */}
          <ToastNotification />

        </div>
      </Router>
    </ClaimProvider>
  );
}

export default App;
