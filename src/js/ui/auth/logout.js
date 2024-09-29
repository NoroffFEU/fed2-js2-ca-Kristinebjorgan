import { clearAuthData } from "../../utilities/authGuard";

/**
 * Logs out the user by clearing authentication data and redirecting to the login page.
 *
 * This function is triggered when the user chooses to log out. It clears the token and
 * other relevant user data from local storage, then redirects the user to the login page.
 *
 * @example
 * // Example usage:
 * document.getElementById("logoutButton").addEventListener("click", handleLogout);
 */

export function handleLogout() {
  clearAuthData();
  window.location.href = "/ui/auth/login.html";
}
