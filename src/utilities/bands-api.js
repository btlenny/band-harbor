import axios from 'axios';
import sendRequest from './send-request';

const API_URL = '/bands';

const addBand = async (bandData, authToken) => {
  try {
    
    const response = await axios.post(API_URL, bandData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Other band-related functions...

export function createBand(bandData) {
  return sendRequest('/api/bands', 'POST', bandData);
}

export function getAllBands() {
  return sendRequest('/api/bands', 'GET');
}

export function getBandById(id) {
  return sendRequest(`/api/bands/${id}`, 'GET');
}

