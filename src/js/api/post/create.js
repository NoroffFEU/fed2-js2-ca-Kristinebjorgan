/**
 * Imports utility functions for retrieving the authentication token and API key.
 *
 * `getToken` retrieves the stored JWT token, and `getApiKey` retrieves the API key
 * required for API interactions.
 */
import { getToken, getApiKey } from "../auth/key";
import { fetchPosts } from "../post/read";
import { resetForm } from "../ui/post/update";

/**
 * Creates a new post and sending a POST request.
 *
 * This function performs the following actions:
 * - Prevents default form submission behavior.
 * - Gets the auth token and API key from localStorage.
 * - Validates the token and API key.
 * - Takes postData from form fields: title, image URL, location, and text content.
 * - Sends the post data to the API via a POST method.
 * - Successful: alerts the user, resets the form, and fetches the updated list of posts.
 * - Error: displays an error message.
 *
 * @param {Event} event - The event object triggered by the form submission.
 * @throws {Error} If the API request fails or returns an error response.
 * @example
 * document.getElementById("createPostForm").addEventListener("submit", createPost);
 */
export function createPost(event) {
  event.preventDefault();
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    alert("You must be logged in to create a post.");
    return;
  }

  const title = document.getElementById("title").value || "Untitled Post";
  const imageUrl =
    document.getElementById("image").value || "public/default-image.png";
  const location = document.getElementById("location").value || "Unknown";
  const text = document.getElementById("text").value || "No content";
  const postDate = new Date().toISOString();

  const newPostData = {
    title: title,
    body: text,
    tags: ["petal-parlour", location],
    media: {
      url: imageUrl,
      alt: title,
    },
    created: postDate,
  };

  fetch("https://v2.api.noroff.dev/social/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-Noroff-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPostData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error creating post.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Post created successfully!");
      resetForm();
      fetchPosts();
    })
    .catch((error) => {
      alert("Post creation failed: " + error.message);
    });
}
