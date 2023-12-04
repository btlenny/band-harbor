// Add the following import
import sendRequest from './send-request';

const BASE_URL = '/api/users';
export default BASE_URL;
// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  // Assuming checkToken is a GET request to /checkToken
  return sendRequest(`${BASE_URL}/checkToken`, 'GET')
    .then(dateStr => new Date(dateStr));
}