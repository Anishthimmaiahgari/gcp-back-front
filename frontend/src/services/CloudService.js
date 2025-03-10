import axios from 'axios';

const CloudService = {
  authenticateGCP: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/authenticate-gcp`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Store authentication data
      if (response.data.project_id) {
        localStorage.setItem('gcp_authenticated', 'true');
        localStorage.setItem('gcp_project_id', response.data.project_id);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to authenticate with GCP');
    }
  },
  
  getAPIDetails: async (apiName) => {
    try {
      // Check if we're authenticated
      if (!localStorage.getItem('gcp_authenticated')) {
        throw new Error('Not authenticated with GCP. Please upload credentials first.');
      }
      
      // Fix: Remove the "/api" prefix from the URL
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api-details`, { 
        apiName,
        projectId: localStorage.getItem('gcp_project_id')
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch API details');
    }
  },
  
  isGCPAuthenticated: () => {
    return localStorage.getItem('gcp_authenticated') === 'true';
  },
  
  getGCPProjectId: () => {
    return localStorage.getItem('gcp_project_id');
  },
  
  clearGCPAuthentication: () => {
    localStorage.removeItem('gcp_authenticated');
    localStorage.removeItem('gcp_project_id');
  }
};

export default CloudService;