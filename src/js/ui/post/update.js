import { createPost } from "../post/create";
import { updatePost } from "../post/update";

/**
 * Resets the form for adding or editing a post.
 *
 * This function performs the following actions:
 * - Clears all input fields by resetting the form element.
 * - Clears the hidden `postId` field to ensure that a new post is created rather than editing an existing one.
 * - Changes the submit button's text back to "Submit" to indicate a new post creation.
 * - Removes any existing `updatePost` event listener from the form to avoid triggering an update.
 * - Reattaches the `createPost` event listener to handle new post submissions.
 *
 * @example
 * resetForm(); // Resets the form and prepares it for new post creation.
 */
export function resetForm() {
  const form = document.getElementById("addPostForm");
  form.reset();
  document.getElementById("postId").value = "";
  document.getElementById("submitButton").textContent = "Submit";
  form.removeEventListener("submit", updatePost);
  form.addEventListener("submit", createPost);
}

/**
 * Displays the posts.
 *
 * This function handles the following actions:
 * - Clears the posts container if it's the first page of results.
 * - Iterates through each post and generates the HTML structure.
 * - Displays the posts image, title, body, author, location and date
 * - Attaches a click event to each post, redirecting to a detailed post view (`post.html`) using the post's ID.
 *
 * @param {Array<Object>} posts - An array of post objects to display.
 * @param {number} page - The current page of posts being displayed.
 *
 * @example
 * // Display posts for page 1
 * displayPosts(posts, 1);
 */
export function displayPosts(posts, page) {
  const postsContainer = document.getElementById("postsContainer");
  if (!postsContainer) return;

  if (page === 1) postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const location = post.tags?.[1] || "Unknown";
    const reactionsCount = post._count?.reactions || 0;
    const author = post.author?.name || "Anonymous";
    const imageUrl = post.media?.url || "/assets/default-image.png";
    const postDate = new Date(post.created).toLocaleDateString();

    const postElement = document.createElement("div");
    postElement.classList.add("post", "mb-4", "p-3", "border", "rounded");
    postElement.innerHTML = `
      <div class="post-inner">
        <div class="post-content">
          <div class="post-image-container mb-3">
            <img src="${imageUrl}" alt="${post.media?.alt || "Post Image"}"
              class="post-image img-fluid rounded" 
              onerror="this.onerror=null;this.src='/assets/default-image.png';">
          </div>
          <div class="post-meta d-flex justify-content-between text-muted mb-3">
            <span><i class="fas fa-map-marker-alt"></i> ${location}</span>
            <span><i class="fas fa-calendar-alt"></i> Posted on: ${postDate}</span>
            <span><i class="fas fa-heart"></i> ${reactionsCount}</span>
          </div>
          <div class="post-body">
            <h4 class="post-link">${post.title || "Untitled Post"}</h4>
            <p>${post.body || "No content"}</p>
          </div>
          <div class="author-details text-muted"><p>${author}</p></div>
        </div>
      </div>`;

    // Attach click event to postElement
    postElement.addEventListener("click", () => {
      window.location.href = `/post/detail/index.html?id=${post.id}`;
    });

    postsContainer.appendChild(postElement);
  });
}

/**
 * Displays a single post
 *
 * This function updates the DOM to show a specific post,
 * including its image, metadata, title, content, and author.
 *
 * @param {Object} post - The post data object to be displayed.
 * @param {string} post.title - The title of the post.
 * @param {string} post.body - The body content of the post.
 * @param {Object} post.media - Media object containing the image data.
 * @param {string} post.media.url - The URL of the post image.
 * @param {string} post.media.alt - The alt text for the post image.
 * @param {Array} post.tags - An array of tags associated with the post. Index 1 typically holds location information.
 * @param {Object} post.author - The author object containing author information.
 * @param {string} post.author.name - The name of the post author.
 * @param {Date} post.created - The creation date of the post.
 * @param {Object} post._count - The object containing reaction counts.
 * @param {number} post._count.reactions - The number of reactions to the post.
 */

export function displaySinglePost(post) {
  const postDetails = document.getElementById("postDetails");
  if (!postDetails) {
    console.error("Post details container not found!");
    return;
  }

  document.title = `${post.author?.name || "Anonymous"}'s Post`;

  postDetails.innerHTML = `
    <div class="post-content">
      <div class="post-image-container">
        <img src="${post.media?.url || "/assets/default-image.png"}" alt="${
    post.media?.alt || "Post Image"
  }" class="post-image" onerror="this.onerror=null;this.src='/assets/default-image.png';">
      </div>
      <div class="post-meta">
        <span><i class="fas fa-map-marker-alt"></i> ${
          post.tags?.[1] || "Unknown"
        }</span>
        <span><i class="fas fa-calendar-alt"></i> ${new Date(
          post.created
        ).toLocaleDateString()}</span>
        <span><i class="fas fa-heart"></i> ${post._count?.reactions || 0}</span>
      </div>
      <div class="post-body">
        <h2>${post.title || "Untitled Post"}</h2>
        <p>${post.body || "No content"}</p>
      </div>
      <div class="author-details"><p>Author: ${
        post.author?.name || "Anonymous"
      }</p></div>
    </div>`;
}
