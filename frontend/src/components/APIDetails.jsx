import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import charts for visualization
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';

function ApiDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiName } = location.state || {};
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiDetails, setApiDetails] = useState(null);
  
  // Dummy data for charts
  const [usageData, setUsageData] = useState([]);
  const [costTrendData, setCostTrendData] = useState([]);
  const [requestTrendData, setRequestTrendData] = useState([]);
  const [apiStatusData, setApiStatusData] = useState([]);

  useEffect(() => {
    // If no API name was passed, redirect back
    if (!apiName) {
      navigate('/active-apis');
      return;
    }

    // Fetch API details
    const fetchApiDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.post('http://localhost:5000/api-details', {
          apiName: apiName
        });
        
        setApiDetails(response.data);
        
        // Generate dummy chart data based on the API name for visualization
        generateChartData(apiName);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching API details:', err);
        setError(err.response?.data?.error || 'Failed to fetch API details');
        setLoading(false);
      }
    };

    fetchApiDetails();
  }, [apiName, navigate]);

  // Function to generate dummy chart data based on API name
  const generateChartData = (apiName) => {
    // Use the API name to seed the random data to get consistent but varied results
    const nameSeed = apiName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate usage data for the past 7 days
    const usageData = [];
    const costData = [];
    const requestData = [];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let i = 0; i < 7; i++) {
      const seed = (nameSeed + i) % 100;
      usageData.push({
        name: days[i],
        cpu: 30 + seed % 50,
        memory: 40 + (seed + 10) % 45,
      });
      
      costData.push({
        name: days[i],
        cost: 50 + (seed % 150),
      });

      requestData.push({
        name: days[i],
        requests: 1000 + seed * 10,
        errors: 20 + (seed % 30)
      });
    }
    
    setUsageData(usageData);
    setCostTrendData(costData);
    setRequestTrendData(requestData);

    // Generate API status breakdown data
    const statusData = [
      { name: 'Successful Requests', value: 97.7, color: '#4ade80' },
      { name: 'Error Requests', value: 2.3, color: '#ef4444' }
    ];
    setApiStatusData(statusData);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle back navigation
  const handleBack = () => {
    navigate(-1);
  };

  // Format API name
  const formatAPIName = (api) => {
    if (!api) return '';
    const parts = api.split('/');
    const serviceName = parts[parts.length - 1].replace('.googleapis.com', '');
    return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  };

  // Dynamic styles based on dark mode
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const headerBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const chartGridColor = isDarkMode ? '#444' : '#ddd';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`shadow ${headerBgColor}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Company Logo */}
            <img
              src="https://th.bing.com/th/id/OIP.PQzWQzdJEXwoGdeuUfsnUAHaCL?rs=1&pid=ImgDetMain"
              alt="Company Logo"
              className="h-8 mr-3 rounded"
            />
            <h1 className="text-2xl font-bold">API Details</h1>
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
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{formatAPIName(apiName)} Details</h1>
        
        {loading ? (
          <div className={`flex justify-center items-center h-64 ${cardBgColor} rounded-lg shadow`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className={`p-6 ${cardBgColor} rounded-lg shadow-md mb-8 border-l-4 border-red-500`}>
            <h2 className="text-xl font-semibold text-red-500 mb-2">Error</h2>
            <p>{error}</p>
          </div>
        ) : apiDetails ? (
          <div className="space-y-8">
            {/* Summary Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Billing Card */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-3">Current Cost</h2>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-blue-500">
                    {apiDetails.billing_info.cost}
                  </span>
                  <span className="ml-2 text-sm opacity-75">/month</span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Budget Usage</span>
                    <span>{apiDetails.billing_info.usage}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: apiDetails.billing_info.usage }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* CPU Usage Card */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-3">CPU Usage</h2>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-green-500">
                    {apiDetails.cpu_utilization.cpu_usage}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: apiDetails.cpu_utilization.cpu_usage }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm opacity-75">
                    Last updated: {apiDetails.cpu_utilization.last_updated || 'Today'}
                  </p>
                </div>
              </div>
              
              {/* Memory Usage Card */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-3">Memory Usage</h2>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-purple-500">
                    {apiDetails.cpu_utilization.memory_usage}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: apiDetails.cpu_utilization.memory_usage }}
                    ></div>
                  </div>
                  <p className="mt-2 text-sm opacity-75">
                    Last updated: {apiDetails.cpu_utilization.last_updated || 'Today'}
                  </p>
                </div>
              </div>
              
              {/* Request Count Card */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-3">API Requests</h2>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-yellow-500">
                    {apiDetails.cpu_utilization.request_count || 'N/A'}
                  </span>
                </div>
                <p className="mt-4 text-sm opacity-75">
                  Average latency: {apiDetails.cpu_utilization.avg_latency || 'N/A'}
                </p>
              </div>
            </div>
            
            {/* Charts Row Expanded */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resource Usage Chart */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-4">Resource Usage (7 Days)</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={usageData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis dataKey="name" stroke={isDarkMode ? "#999" : "#666"} />
                      <YAxis stroke={isDarkMode ? "#999" : "#666"} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: chartGridColor }} />
                      <Area type="monotone" dataKey="cpu" stroke="#4ade80" fillOpacity={1} fill="url(#colorCpu)" name="CPU %" />
                      <Area type="monotone" dataKey="memory" stroke="#a855f7" fillOpacity={1} fill="url(#colorMemory)" name="Memory %" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Cost Trend Chart */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-4">Daily Cost Trend ($)</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={costTrendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis dataKey="name" stroke={isDarkMode ? "#999" : "#666"} />
                      <YAxis stroke={isDarkMode ? "#999" : "#666"} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: chartGridColor }} />
                      <Bar dataKey="cost" fill="#3b82f6" name="Cost ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* New Request Trend Line Chart */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-4">Request Trend (7 Days)</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={requestTrendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
                      <XAxis dataKey="name" stroke={isDarkMode ? "#999" : "#666"} />
                      <YAxis stroke={isDarkMode ? "#999" : "#666"} />
                      <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#1f2937' : '#fff', borderColor: chartGridColor }} />
                      <Line type="monotone" dataKey="requests" stroke="#3b82f6" name="Total Requests" />
                      <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* New API Status Pie Chart */}
              <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
                <h2 className="text-lg font-semibold mb-4">API Request Status</h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={apiStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                      >
                        {apiStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                          borderColor: chartGridColor 
                        }} 
                      />
                      <Legend 
                        layout="horizontal" 
                        verticalAlign="bottom" 
                        align="center"
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            {/* API Details Section */}
            <div className={`${cardBgColor} rounded-lg shadow-md p-6 border ${borderColor}`}>
              <h2 className="text-xl font-semibold mb-4">API Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Service Details</h3>
                  <table className={`w-full border-collapse ${borderColor}`}>
                    <tbody>
                      <tr className={`border-b ${borderColor}`}>
                        <td className="py-2 font-medium">Service Name:</td>
                        <td className="py-2">{apiDetails.billing_info.service_name || formatAPIName(apiName)}</td>
                      </tr>
                      <tr className={`border-b ${borderColor}`}>
                        <td className="py-2 font-medium">Billing Account:</td>
                        <td className="py-2">{apiDetails.billing_info.billing_account || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-medium">Last Updated:</td>
                        <td className="py-2">{apiDetails.cpu_utilization.last_updated || 'N/A'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-medium mb-2">API Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">API Health</span>
                        <span className="text-sm text-green-500 font-medium">Healthy</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Error Rate</span>
                        <span className="text-sm text-yellow-500 font-medium">2.3%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full w-8"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`p-6 ${cardBgColor} rounded-lg shadow-md mb-8`}>
            <p>No API details found.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default ApiDetails;
