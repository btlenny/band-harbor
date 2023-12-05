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
export function createComment(bandId, commentData) {
    return sendRequest(`api/bands/${bandId}/comments`, 'POST', commentData);
}

export function getAllComments(bandId) {
    return sendRequest(`api/bands/${bandId}/comments`, 'GET');
}

export function getCommentById(bandId, commentId) {
    return sendRequest(`api/bands/${bandId}/comments/${commentId}`, 'GET');
}

export function deleteComment(bandId, commentId) {
    return sendRequest(`api/bands/${bandId}/comments/${commentId}`, 'DELETE');
}

export function updateComment(bandId, commentId, commentData) {
    return sendRequest(`api/bands/${bandId}/comments/${commentId}`, 'PUT', commentData);
}