import axios from 'axios';

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

export { addBand };