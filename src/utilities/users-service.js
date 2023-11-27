// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api';


export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not miliseconds
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export const login = async (credentials) => {
  try {
    const user = await login(credentials);
    // Optionally, you might store the user token or other information in local storage or state.
    return user;
  } catch (error) {
    // Handle errors or rethrow them as needed
    throw error;
  }
};

export function checkToken() {
  alert('clicked')
}