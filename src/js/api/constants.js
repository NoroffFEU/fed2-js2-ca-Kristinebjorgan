/**
 * API requests
 * Sends an API request to the URL with the method and body.
 *
 * This function Fetches the API and handles JSON raw material to body,
 * Error: throws an error if the response is not successful.
 *
 * @async
 * @function sendApiRequest
 * @param {string} url - The URL of the API endpoint to send the request to.
 * @param {string} method - The HTTP method to use for the request.
 * @param {Object} [body={}] - The request body to send as JSON.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response from the API.
 * @throws {Error} - Throws an error if the response is not ok.
 *
 * @example
 * // Example usage: Sending a POST request with data
 * sendApiRequest('https://api.example.com/data', 'POST', { name: 'John' })
 *   .then(response => console.log(response))
 *   .catch(error => console.error('Error:', error.message));
 */
export async function sendApiRequest(url, method, body = {}) {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }
  return response.json();
}
