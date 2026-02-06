import PropTypes from 'prop-types';

/**
 * LoadingSpinner Component
 * Displays an animated loading spinner
 * @param {Object} props
 * @param {string} props.size - Size of spinner (sm, md, lg)
 * @param {string} props.text - Optional loading text
 */
const LoadingSpinner = ({ size = 'md', text = '' }) => {
  // Size configurations
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-10 w-10 border-4',
    lg: 'h-16 w-16 border-4',
  };

  const containerSizes = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${containerSizes[size]}`}>
      {/* Exide-themed spinner */}
      <div className="relative">
        <div 
          className={`
            ${sizeClasses[size]} 
            border-gray-200 
            rounded-full 
            border-t-exide-red 
            border-l-exide-blue
            animate-spin
          `}
        />
        {/* Inner glow effect */}
        <div 
          className={`
            absolute inset-0 
            ${sizeClasses[size]} 
            rounded-full 
            border-t-transparent 
            border-l-transparent
            animate-spin
            opacity-30
          `}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        />
      </div>
      
      {/* Loading text */}
      {text && (
        <p className="text-gray-600 font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
};

/**
 * Full page loading overlay
 */
export const PageLoader = ({ text = 'Loading...' }) => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-exide-blue font-semibold">{text}</p>
    </div>
  </div>
);

export default LoadingSpinner;

