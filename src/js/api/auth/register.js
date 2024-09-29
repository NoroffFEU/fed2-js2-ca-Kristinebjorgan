import { sendApiRequest } from "../constants";

/**
 * Registers a new user by submitting to the API.
 *
 * This function is triggered when the user submits the registration form. It validates the users input
 * and sends the data to the Noroff API for registration.
 * Successful: user is redirected to the login page.
 * Error: error message is shown.
 *
 * @param {Event} event - The form submission event triggered by the user.
 *
 * @throws {Error} If the registration API call fails or invalid input is provided.
 *
 * @example
 * // Example usage:
 * document.getElementById("registerForm").addEventListener("submit", registerUser);
 */
export async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!name || !email || !password) {
    alert("All required fields must be filled in.");
    return;
  }

  const nameRegex = /^[a-zA-Z0-9_]+$/;
  if (!nameRegex.test(name)) {
    alert("The name must only contain letters, numbers, and underscores.");
    return;
  }

  const emailRegex = /@(stud\.)?noroff\.no$/;
  if (!emailRegex.test(email)) {
    alert("Please use a valid Noroff email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  try {
    const data = { name, email, password };
    const responseData = await sendApiRequest(
      "https://v2.api.noroff.dev/auth/register",
      "POST",
      data
    );

    alert("Registration successful! You can now log in.");
    document.getElementById("registerForm").reset();
    window.location.href = "login.html";
  } catch (error) {
    alert("Registration failed: " + error.message);
  }
}
