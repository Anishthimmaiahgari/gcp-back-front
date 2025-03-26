import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  Zap, 
  Moon, 
  Sun, 
  ChevronLeft, 
  Clock, 
  Check, 
  AlertTriangle 
} from 'lucide-react';

function ActiveAPIs() {
  const location = useLocation();
  const navigate = useNavigate();
  const apis = location.state?.apis || [];
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoveredApi, setHoveredApi] = useState(null);

  // Function to format the API name
  const formatAPIName = (api) => {
    const formattedName = api.replace('.googleapis.com', '');
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Navigate to API details page
  const navigateToAPIDetails = (api) => {
    navigate('/api-details', { state: { apiName: api } });
  };

  // Dynamic styles based on dark mode
  const bgColor = isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black' : 'bg-gradient-to-br from-gray-100 to-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode 
    ? 'bg-gray-800/60 backdrop-blur-sm border border-gray-700/50' 
    : 'bg-white/80 backdrop-blur-sm border border-gray-200/50';
  const headerBgColor = isDarkMode 
    ? 'bg-gray-800/50 backdrop-blur-sm' 
    : 'bg-white/50 backdrop-blur-sm';

  return (
    <div 
      className={`min-h-screen ${bgColor} ${textColor} transition-all duration-300`}
      style={{
        backgroundImage: isDarkMode 
          ? 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://www.solidbackgrounds.com/images/1920x1080/1920x1080-black-solid-color-background.jpg")' 
          : 'linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url("https://www.solidbackgrounds.com/images/1920x1080/1920x1080-white-solid-color-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Header */}
      <header className={`shadow-lg ${headerBgColor}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain"
              alt="Company Logo"
              className="h-10 mr-4 rounded-lg shadow-md transition-transform hover:scale-105"
            />
            <h1 className="text-2xl font-bold flex items-center">
              <Layers className="mr-2" />
              Active APIs
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode 
                  ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`px-4 py-2 rounded-lg flex items-center transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              <ChevronLeft className="mr-1" /> Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <Zap className="inline-block mr-2 text-yellow-500" />
          Your Enabled APIs
        </h2>
        
        {apis.length === 0 ? (
          <div className="text-center bg-gray-800/50 p-8 rounded-lg">
            <AlertTriangle className="mx-auto mb-4 text-yellow-500" size={48} />
            <p className="text-xl">No Active APIs Found</p>
            <p className="text-gray-400 mt-2">Connect your cloud provider to see your APIs</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apis.map((api, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredApi(index)}
                onMouseLeave={() => setHoveredApi(null)}
                onClick={() => navigateToAPIDetails(api)}
                className={`
                  rounded-xl shadow-xl p-6 ${cardBgColor} 
                  transform transition-all duration-300 
                  cursor-pointer group
                  ${hoveredApi === index ? 'scale-105 shadow-2xl' : 'scale-100'}
                `}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                    {formatAPIName(api)}
                  </h3>
                  <Check 
                    className="text-green-500 opacity-70 group-hover:opacity-100 transition-opacity" 
                    size={24} 
                  />
                </div>
                <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Enabled in your cloud project
                </p>
                <div className="mt-4 flex items-center text-sm">
                  <Clock className="mr-2 text-blue-500" size={16} />
                  <span>Recently Active</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ActiveAPIs;
