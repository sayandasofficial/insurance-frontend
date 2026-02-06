import PropTypes from 'prop-types';

/**
 * PageContainer Component
 * Wraps page content with consistent padding and layout
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child content
 * @param {string} props.className - Additional CSS classes
 */
const PageContainer = ({ children, className = '' }) => {
  return (
    <div className={`flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageContainer;

