// Add the following import
import sendRequest from './send-request';
const BASE_URL = '/api/users';

// Refactored code below
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  // Just so that you don't forget how to use .then
  return usersAPI.checkToken()
    // checkToken returns a string, but let's 
    // make it a Date object for more flexibility
    .then(dateStr => new Date(dateStr));
}