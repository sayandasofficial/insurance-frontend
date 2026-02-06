import { createContext, useContext, useState, useEffect } from 'react';

/**
 * ClaimContext - Global state management for insurance claims
 * Stores claims in localStorage for persistence across page refreshes
 */
const ClaimContext = createContext();

/**
 * ClaimProvider Component
 * @param {React.ReactNode} children - Child components to wrap
 */
export const ClaimProvider = ({ children }) => {
  // Initialize state from localStorage or use empty array
  const [claims, setClaims] = useState(() => {
    const savedClaims = localStorage.getItem('insurance_claims');
    return savedClaims ? JSON.parse(savedClaims) : [];
  });

  const [currentClaim, setCurrentClaim] = useState(null);

  // Update localStorage whenever claims change
  useEffect(() => {
    localStorage.setItem('insurance_claims', JSON.stringify(claims));
  }, [claims]);

  /**
   * Add a new claim to the state
   * @param {Object} claimData - The claim data to add
   */
  const addClaim = (claimData) => {
    const newClaim = {
      ...claimData,
      id: claimData.id || Date.now().toString(),
      submittedAt: new Date().toISOString(),
    };
    setClaims(prevClaims => [...prevClaims, newClaim]);
    setCurrentClaim(newClaim);
    return newClaim;
  };

  /**
   * Get a specific claim by ID
   * @param {string} id - The claim ID
   */
  const getClaim = (id) => {
    return claims.find(claim => claim.id === id);
  };

  /**
   * Clear current claim selection
   */
  const clearCurrentClaim = () => {
    setCurrentClaim(null);
  };

  /**
   * Get all claims count
   */
  const getClaimsCount = () => {
    return claims.length;
  };

  // Context value
  const value = {
    claims,
    currentClaim,
    addClaim,
    getClaim,
    clearCurrentClaim,
    getClaimsCount,
  };

  return (
    <ClaimContext.Provider value={value}>
      {children}
    </ClaimContext.Provider>
  );
};

/**
 * Custom hook to use ClaimContext
 * @returns {Object} Claim context values
 */
export const useClaims = () => {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error('useClaims must be used within a ClaimProvider');
  }
  return context;
};

export default ClaimContext;

