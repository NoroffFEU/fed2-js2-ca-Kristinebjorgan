import { sendApiRequest } from "../constants";
import { storeToken } from "../ui/utilities/authGuard.js";

/**
 * Logs in the user by submitting to the API with noroff requirements.
 *
 * This function is triggered when the user submits the login form. It validates that the email
 * and password fields are filled in and fulfilled requirements, sends a request to the Noroff API to log in, and stores
 * the received access token in localStorage.
 *
 * @param {Event} event - The form submission event triggered by the user.
 *
 * @throws {Error} If the login API call fails or no access token is returned.
 *
 * @example
 * // Example usage:
 * document.getElementById("loginForm").addEventListener("submit", loginUser);
 */
export async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  try {
    const responseData = await sendApiRequest(
      "https://v2.api.noroff.dev/auth/login",
      "POST",
      { email, password }
    );

    const token = responseData.data?.accessToken || responseData.accessToken;

    if (!token) {
      alert("Login failed: No access token returned.");
      return;
    }

    storeToken(token);
    window.location.href = "index.html";
  } catch (error) {
    alert("Login failed: " + error.message);
  }
}
