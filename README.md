
**Overview**
Petal Parlour is a social media platform that fosters a vibrant community of flower and nature enthusiasts. Users can share their experiences through images, text, and location tags, making it a digital garden for people to explore and interact with. It is a simple web application that allows users to create, update, delete, and fetch posts tagged as part of a virtual "Petal Parlour". Users can register, log in, and manage their posts, including uploading media and tagging their location. The app features character counting, pagination, and smooth user experiences like form resetting, seamless editing, and real-time UI updates.
This project interacts with the Noroff Social API.

![logo](logo.png)

**Features**
User Registration and Login: Allows users to sign up with a valid Noroff student email, securely log in, and manage posts.
Post Creation: Users can create posts with text, images, and location tags, making their contributions to the "Petal Parlour" visible to the community.
Post Management: Users can edit or delete their posts at any time, and changes are reflected immediately thanks to real-time UI updates.
Character Counting: The text area for posts features live character counting, capped at 280 characters to keep posts concise and engaging.
Media Uploads: Users can upload images with their posts, and a default image is provided if none is specified.
Pagination: Posts are fetched and displayed in pages, ensuring smooth scrolling and loading, even with large datasets.
Logout: Users can easily log out of the application after their session, maintaining secure interactions.

**Technologies Used
**
HTML
SCSS
JavaScript
Noroff Social API for backend interaction
LocalStorage for token management

**Navigate to the project directory:
**
bash
Copy code
cd petal-parlour

**Start the project:
**
You can either:
Open the index.html file directly in a browser
Or use a tool like Live Server in VS Code or npm serve:
bash
Copy code
npm run start

**API Usage
**
This project interacts with the Noroff Social API, and most actions like fetching, creating, updating, and deleting posts are performed via API calls.
Example API Calls
Register: /auth/register
Login: /auth/login
Get Posts: /social/posts
Create Post: /social/posts
Edit Post: /social/posts/{id}
Delete Post: /social/posts/{id}

**How to Use the Application
**
1. Register
Navigate to the newuser.html page and fill in your details (Name, Noroff Email, and Password).
After successful registration, you’ll be redirected to the login page.
2. Log In
Enter your Noroff Email and Password to log in.
Upon successful login, you’ll be redirected to the main page where you can create new posts, edit, or delete existing ones.
3. Create, Edit, and Delete Posts
Create: Fill in the post form (Title, Image, Date, Location, and Text) and submit.
Edit: Click the "Edit" button next to any of your posts, make changes, and click "Resubmit".
Delete: Click the "Delete" button to permanently remove a post.

**Contributors**
Kristine Bjørgan Østby
