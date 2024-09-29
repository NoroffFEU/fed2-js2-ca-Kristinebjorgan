import { fetchPosts } from "./read";
import { getToken, getApiKey } from "../auth/key";

/**
 * Deletes a post by sending a DELETE.
 *
 * This function performs the following actions:
 * - Retrieves the token and API key.
 * - Sends a DELETE request to the API.
 * - Successful: alerts the user and refreshes the posts list.
 * - Error: displays an error message.
 *
 * @param {string} postId - The ID of the post to be deleted.
 *
 * @example
 * // Delete a post with the ID '12345'
 * deletePost('12345');
 */
export function deletePost(postId) {
  const token = getToken();
  const apiKey = getApiKey();

  fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-Noroff-api-key": apiKey,
    },
  })
    .then((response) => {
      if (response.status === 204) {
        alert("Post deleted successfully!");
        fetchPosts();
      } else {
        throw new Error("Failed to delete post");
      }
    })
    .catch((error) => alert("Error deleting post: " + error.message));
}
