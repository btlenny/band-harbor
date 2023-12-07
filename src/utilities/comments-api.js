import axios from 'axios';
import sendRequest from './send-request';

const API_URL = '/api'; // Updated base URL

export function createComment(bandId, commentData) {
    console.log('Comment Data:', commentData);  // Add this line for debugging
    return sendRequest(`/api/${bandId}/comments`, 'POST', commentData);
}

export function getAllComments(bandId) {
    const url = `${API_URL}/${bandId}/comments`;

    // Log the URL for debugging
    console.log('Fetching comments URL:', url);

    return sendRequest(url, 'GET');
}



export function deleteComment(commentId, commentData) {
    return sendRequest(`${API_URL}/comments/${commentId}`, 'DELETE', commentData);
}

export function updateComment( commentId, commentData) {
    return sendRequest(`${API_URL}/comments/${commentId}`, 'PUT', commentData);
}