// Define the main module
const Blog = (() => {
    // Private variables and functions
    let posts = [];
  
    const savePosts = () => {
      // Save the posts array to localStorage
      localStorage.setItem('blogPosts', JSON.stringify(posts));
    };
  
    const loadPosts = () => {
      // Load the posts array from localStorage
      const savedPosts = localStorage.getItem('blogPosts');
      if (savedPosts) {
        posts = JSON.parse(savedPosts);
      }
    };
  
    const renderPost = (post) => {
      // Clone the post template
      const template = document.getElementById('post-template');
      const postMarkup = template.content.cloneNode(true);
      // Update the post markup with the post data
      const postTitle = postMarkup.querySelector('.post-title');
      const postDate = postMarkup.querySelector('.post-date');
      const postSummary = postMarkup.querySelector('.post-summary');
      postTitle.textContent = post.title;
      postDate.textContent = post.date;
      postSummary.textContent = post.summary;
      // Attach event listeners to the edit and delete buttons
      const editButton = postMarkup.querySelector('.edit-post');
      const deleteButton = postMarkup.querySelector('.delete-post');
      editButton.addEventListener('click', () => {
        editPost(post);
      });
      deleteButton.addEventListener('click', () => {
        deletePost(post);
      });
      // Return the updated post markup
      return postMarkup;
    };
  
    const renderPosts = () => {
      // Get the DOM element where the posts will be displayed
      const postList = document.getElementById('post-list');
      // Clear the existing content
      postList.innerHTML = '';
      // Loop over the posts array and render each post
      posts.forEach((post) => {
        const postMarkup = renderPost(post);
        postList.appendChild(postMarkup);
      });
    };
  
    const addPost = (post) => {
      // Add a new post to the posts array
      posts.push(post);
      // Render the updated list of posts
      renderPosts();
      // Save the posts array to localStorage
      savePosts();
    };
  
    const deletePost = (post) => {
      // Find the index of the post in the posts array
      const index = posts.indexOf(post);
      // Remove the post from the posts array
      posts.splice(index, 1);
      // Render the updated list of posts
      renderPosts();
      // Save the posts array to localStorage
      savePosts();
    };

    const editPost = (post) => {
      const { title, date, summary } = post;
      // Create a dialog element
      const dialog = document.createElement('dialog');
      // Import the add form template into the dialog
      const template = document.getElementById('add-form-template');
      const form = document.importNode(template.content, true);
      dialog.appendChild(form);
      // Populate the form fields with the post data
      const titleInput = dialog.querySelector('#title-input');
      const dateInput = dialog.querySelector('#date-input');
      const summaryInput = dialog.querySelector('#summary-input');
      titleInput.value = title;
      dateInput.value = date;
      summaryInput.value = summary;
      // Attach event listeners to the dialog form
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        post.title = titleInput.value;
        post.date = dateInput.value;
        post.summary = summaryInput.value;
        renderPosts();
        savePosts();
        dialog.close();
      });
      // Attach event listener to the dialog close button
      const closeButton = dialog.querySelector('[data-dialog-close]');
      closeButton.addEventListener('click', () => {
        dialog.close();
      });
      // Attach the dialog to the document
      document.body.appendChild(dialog);
      // Open the dialog
      dialog.showModal();
    };
    
    
      
      
      
    // Public API
    return {
      init() {
        // Load any saved posts from localStorage
        loadPosts();
        // Render the initial set of posts
        renderPosts();
        // Attach event listener to the form submission
        const addForm = document.getElementById('add-form');
        addForm.addEventListener('submit', (event) => {
          event.preventDefault();
          const formData = new FormData(addForm);
          const newPost = {
            title: formData.get('title'),
            date: formData.get('date'),
            summary: formData.get('summary'),
          };
          addPost(newPost);
          addForm.reset();
        });
      },
    };
  })();
  
  // Initialize the module when the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    Blog.init();
  });
  