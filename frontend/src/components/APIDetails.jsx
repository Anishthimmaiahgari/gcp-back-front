import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CloudService from '../services/CloudService';


function APIDetails() {
  const location = useLocation();
  const { apiName } = location.state || {}; // Get the API name passed through navigation
  const [billingInfo, setBillingInfo] = useState(null);
  const [cpuUtilization, setCpuUtilization] = useState(null);
  const [error, setError] = useState(null);

  // Fetch billing information and CPU utilization for the API
  useEffect(() => {
    if (apiName) {
      CloudService.getAPIDetails(apiName)
        .then((data) => {
          setBillingInfo(data.billing_info);
          setCpuUtilization(data.cpu_utilization);
        })
        .catch((err) => setError(err.message));
    }
  }, [apiName]);
  

  if (!apiName) {
    return <div>API not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="shadow bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">API Details: {apiName}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && <div className="text-red-500">{error}</div>}

        <div className="mb-6">
          <h2 className="text-xl font-semibold">Billing Information</h2>
          {billingInfo ? (
            <div>
              <p>Cost: {billingInfo.cost}</p>
              <p>Usage: {billingInfo.usage}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold">CPU Utilization</h2>
          {cpuUtilization ? (
            <div>
              <p>CPU Usage: {cpuUtilization.cpu_usage}</p>
              <p>Memory Usage: {cpuUtilization.memory_usage}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default APIDetails;
