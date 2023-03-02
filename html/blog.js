// Import DOMPurify
import DOMPurify from 'https://cdn.skypack.dev/dompurify@2.3.1';

// Define the post template
const postTemplate = document.querySelector('#post-template');

// Define the posts array and load from localStorage if available
let posts = [];

const savedPosts = localStorage.getItem('posts');
if (savedPosts) {
  posts = JSON.parse(savedPosts);
}

// Function to save the posts array to localStorage
function savePosts() {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to render the posts in the UI
function renderPosts() {
  const postsContainer = document.querySelector('#posts');
  postsContainer.innerHTML = '';
  posts.forEach((post) => {
    const postElement = postTemplate.content.cloneNode(true);
    postElement.querySelector('h3').textContent = post.title;
    postElement.querySelector('p:nth-of-type(1)').textContent = post.date;
    postElement.querySelector('p:nth-of-type(2)').textContent = post.summary;
    postsContainer.appendChild(postElement);
  });
}

// Function to add a new post
function addPost(title, date, summary) {
  const newPost = {
    id: Date.now().toString(),
    title,
    date,
    summary
  };
  posts.push(newPost);
  savePosts();
  renderPosts();
}

// Function to initialize the app
function init() {
  // Render the existing posts in the UI
  renderPosts();

  // Attach event listener to the Add Post form
  const addPostForm = document.querySelector('form');
  addPostForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = addPostForm.querySelector('#title').value.trim();
    const date = addPostForm.querySelector('#date').value;
    const summary = DOMPurify.sanitize(addPostForm.querySelector('#summary').value.trim());
    if (title && date && summary) {
      addPost(title, date, summary);
      addPostForm.reset();
    }
  });
}

// Call the init function to initialize the app
init();
