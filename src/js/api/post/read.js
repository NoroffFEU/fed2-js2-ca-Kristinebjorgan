import { getToken, getApiKey } from "../auth/key";
import { displayPosts } from "../ui/auth/post/update";

/**
 * Pagination for fetchPosts.
 *
 * `currentPage`: Tracks the current page being displayed.
 * `isLastPage`: A flag that indicates whether the last page of posts has been reached.
 *
 * @type {number} currentPage - The current page being fetched or displayed.
 * @type {boolean} isLastPage - True if the last page has been reached.
 */
let currentPage = 1;
let isLastPage = false;

/**
 * Fetches posts from the API.
 *
 * This function performs the following actions:
 * - Retrieves the API token and key.
 * - Fetches the posts with a specific tag ("petal-parlour") from the API
 * - Displays the fetched posts using the `displayPosts` function.
 * - Disables the "Load More" button if there are no more pages to fetch.
 *
 * @param {number} [page=1] - The current page number to fetch posts for, defaulting to 1.
 *
 * @example
 * // Fetch the first page of posts
 * fetchPosts(1);
 *
 * @throws Will display an alert if there's an error fetching posts.
 */
export function fetchPosts(page = 1) {
  const token = getToken();
  const apiKey = getApiKey();
  const postsContainer = document.getElementById("postsContainer");

  if (!token || !apiKey || !postsContainer) return;

  fetch(
    `https://v2.api.noroff.dev/social/posts?limit=12&page=${page}&_tag=petal-parlour&_author=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-Noroff-api-key": apiKey,
      },
    }
  )
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((data) => {
      displayPosts(data.data, page); // Pass current page to display

      // Disable the Load More button if it's the last page
      if (data.meta.isLastPage) {
        document.getElementById("loadMoreBtn").disabled = true;
      }
    })
    .catch((error) => alert("Error fetching posts: " + error));
}

/**
 * Fetches and displays a single post by ID
 *
 * This function sends a GET request to the API to retrieve a specific post,
 * It then passes the post data to `displaySinglePost()` to render the post on the page.
 *
 * @param {string} postId - The ID of the post to fetch.
 *
 * This function performs the following actions:
 * - Validates if the token and API key before the API call.
 * - Makes a GET request to the API to fetch the post data.
 * - Successful: logs and passes the post data to `displaySinglePost()`.
 * - Errors: alert user.
 *
 * @example
 * // Example usage: Fetch and display a post by its ID
 * fetchSinglePost('12345');
 */
export function fetchSinglePost(postId) {
  const token = getToken();
  const apiKey = getApiKey();

  if (!token || !apiKey) {
    return;
  }
  fetch(
    `https://v2.api.noroff.dev/social/posts/${postId}?_author=true&_comments=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-Noroff-api-key": apiKey,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        console.error("Failed to fetch post:", response);
        return Promise.reject(response);
      }
      return response.json();
    })
    .then((postData) => {
      displaySinglePost(postData.data);
    })
    .catch((error) => {
      alert("Error fetching post details: " + error.message);
      console.error("Error fetching post details:", error);
    });
}
