import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer';

/**
 * Home Page
 * Dashboard-style landing page with navigation tiles
 */
const Home = () => {
  // Dashboard cards data
  const dashboardCards = [
    {
      title: 'Submit Insurance Claim',
      description: 'File a new insurance claim for your vehicle, property, or other assets.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/insurance-form',
      color: 'from-exide-red to-exide-darkRed',
      hoverColor: 'hover:from-exide-darkRed hover:to-exide-red',
    },
    {
      title: 'Upload Claim Documents',
      description: 'Upload supporting documents for your existing insurance claims.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      link: '/claim-upload',
      color: 'from-exide-blue to-exide-darkBlue',
      hoverColor: 'hover:from-exide-darkBlue hover:to-exide-blue',
    },
    {
      title: 'Check Claim Status',
      description: 'Track the status of your submitted insurance claims using your Claim ID.',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      link: '/claim-status',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:from-green-600 hover:to-green-800',
    },
  ];

  // Features section
  const features = [
    {
      title: 'Easy Process',
      description: 'Simple and intuitive claim submission process',
      icon: '⚡',
    },
    {
      title: 'Quick Processing',
      description: 'Fast claim evaluation and approval',
      icon: '🚀',
    },
    {
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise security',
      icon: '🔒',
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer service support',
      icon: '💬',
    },
  ];

  return (
    <PageContainer className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-exide-blue mb-4">
          Welcome to Insurance Portal
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Exide Industries Limited's dedicated insurance claim management system. 
          Submit, track, and manage your insurance claims with ease.
        </p>
        
        {/* Decorative element */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="h-1 w-16 bg-exide-red rounded"></div>
          <div className="h-1 w-16 bg-exide-blue rounded"></div>
          <div className="h-1 w-16 bg-exide-red rounded"></div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {dashboardCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="group"
          >
            <div className={`
              card p-8 h-full
              bg-gradient-to-br ${card.color} ${card.hoverColor}
              transform group-hover:scale-[1.02] group-hover:-translate-y-1
              transition-all duration-300 ease-out
              text-white
            `}>
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  {card.icon}
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
                  <p className="text-white/90 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center text-white/80 group-hover:text-white transition-colors">
                <span className="font-medium">Get Started</span>
                <svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-exide-blue text-center mb-8">
          Why Choose Our Portal?
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-exide-blue to-exide-darkBlue rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Submit Your Claim?
        </h2>
        <p className="text-white/90 mb-6 max-w-xl mx-auto">
          Our streamlined process ensures your claims are handled quickly and efficiently. 
          Start your claim submission today.
        </p>
        <Link 
          to="/insurance-form"
          className="inline-block bg-white text-exide-blue font-semibold py-3 px-8 rounded-lg 
                     hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
        >
          Start New Claim
        </Link>
      </div>
    </PageContainer>
  );
};

export default Home;

