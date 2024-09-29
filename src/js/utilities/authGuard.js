/**
 * Stores the JWT token in localStorage.
 *
 * This function saves the authentication token for the API.
 *
 * @param {string} token - The JWT token to store in local storage.
 *
 * @example
 * // Example usage:
 * storeToken("eyJhbGciOiJIUzI1NiIsInR5cCI...");
 */
export function storeToken(token) {
  if (token) {
    localStorage.setItem("jwtToken", token);
  }
}

/**
 * Clears the JWT token (logout help)
 * 
 * This function is used during the logout process to remove stored info.
 *
 * @example
 * // Example usage:
 * clearAuthData();  // This will log out the user by clearing stored tokens.
 */
export function clearAuthData() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("apiKey");
}
