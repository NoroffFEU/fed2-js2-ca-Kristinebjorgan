import { getToken, getApiKey } from "../auth/key";
import { createPost } from "../post/create";
import { fetchPosts } from "../post/read";
import { resetForm } from "../ui/post/update";

// editPost function - prepares the form for editing a post
export function editPost(postId, title, imageUrl, body, location, postDate) {
  const titleInput = document.getElementById("title");
  const imageInput = document.getElementById("image");
  const locationInput = document.getElementById("location");
  const textInput = document.getElementById("text");
  const postIdInput = document.getElementById("postId");

  if (titleInput && imageInput && locationInput && textInput && postIdInput) {
    titleInput.value = title;
    imageInput.value = imageUrl || "";
    locationInput.value = location || "Unknown";
    textInput.value = body || "No content";
    postIdInput.value = postId;

    const submitButton = document.getElementById("submitButton");
    if (submitButton) {
      submitButton.textContent = "Resubmit";
    }

    const form = document.getElementById("addPostForm");
    if (form) {
      form.removeEventListener("submit", createPost);
      form.addEventListener("submit", updatePost);
      form.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    console.error("One or more form fields are missing.");
  }
}

// updatePost function - submits the updated post data
export function updatePost(event) {
  event.preventDefault();

  const token = getToken();
  const apiKey = getApiKey();
  const postId = document.getElementById("postId").value;

  if (!token || !apiKey || !postId) {
    alert(
      "You must be logged in, have an API key, and a valid post to update."
    );
    return;
  }

  const image = document.getElementById("image").value;
  const location = document.getElementById("location").value;
  const text = document.getElementById("text").value;
  const title = document.getElementById("title").value || "Untitled Post";

  const updatedPostData = {
    title: title,
    body: text || "No content provided.",
    tags: ["petal-parlour", location || "Unknown"],
    media: {
      url: image || "/assets/default-post.png",
      alt: title,
    },
  };

  fetch(`https://v2.api.noroff.dev/social/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-Noroff-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPostData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Error updating post.");
        });
      }
      return response.json();
    })
    .then(() => {
      alert("Post updated successfully!");
      resetForm(); // Reset form back to create mode
      fetchPosts(); // Refresh posts after update
    })
    .catch((error) => {
      alert("Post update failed: " + error.message);
    });
}

/**
 * Updates the character count display.
 *
 * This function counts the number of characters users types.
 */

export function updateCharCount() {
  const maxLength = 280;
  const currentLength = document.getElementById("text").value.length;
  document.getElementById(
    "charCount"
  ).textContent = `${currentLength}/${maxLength} characters used`;
}
