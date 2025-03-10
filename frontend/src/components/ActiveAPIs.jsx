import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ActiveAPIs() {
  const location = useLocation();
  const navigate = useNavigate();
  const apis = location.state?.apis || [];
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

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
    navigate('/api-details', { state: { apiName: api } }); // Pass API data as state
  };

  // Dynamic styles based on dark mode
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const headerBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const buttonHoverColor = isDarkMode ? 'hover:bg-blue-600' : 'hover:bg-blue-700';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`shadow ${headerBgColor}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Company Logo */}
            <img
              src="https://bilvantis.io/wp-content/uploads/2022/12/Bilvantis-logo-png.jpg"
              alt="Company Logo"
              className="h-8 mr-3 rounded"
            />
            <h1 className="text-2xl font-bold">Active APIs</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? 'bg-yellow-500' : 'bg-gray-600 text-white'}`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            {/* Back Button */}
            <button
              onClick={handleBack}
              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-300 hover:bg-gray-400'} rounded`}
            >
              Back
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Active APIs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api, index) => (
            <div
              key={index}
              onClick={() => navigateToAPIDetails(api)} // On API click, navigate to the details page
              className={`rounded-lg shadow-md p-6 ${cardBgColor} hover:shadow-lg transition-shadow duration-300 cursor-pointer`}
            >
              <h2 className="text-xl font-semibold">
                {formatAPIName(api)}
              </h2>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                This API is currently enabled in your GCP project.
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default ActiveAPIs;
