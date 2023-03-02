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
        // Create a form to edit the post data
        const editForm = document.createElement('form');
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = post.title;
        titleLabel.appendChild(titleInput);
        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Date:';
        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.value = post.date;
        dateLabel.appendChild(dateInput);
        const summaryLabel = document.createElement('label');
        summaryLabel.textContent = 'Summary:';
        const summaryInput = document.createElement('input');
        summaryInput.type = 'text';
        summaryInput.value = post.summary;
        summaryLabel.appendChild(summaryInput);
        const cancelButton = document.createElement('button');
        cancelButton.type = 'button';
        cancelButton.textContent = 'Cancel';
        const saveButton = document.createElement('button');
        saveButton.type = 'button';
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', () => {
          // Update the post data from the form
          post.title = titleInput.value;
          post.date = dateInput.value;
          post.summary = summaryInput.value;
          // Re-render the list of posts with the updated post data
          renderPosts();
          // Save the updated posts to localStorage
          savePosts();
          // Close the dialog
          dialog.close();
        });
        editForm.appendChild(titleLabel);
        editForm.appendChild(dateLabel);
        editForm.appendChild(summaryLabel);
        editForm.appendChild(cancelButton);
        editForm.appendChild(saveButton);
        // Open the dialog with the edit form
        const dialog = new Dialog();
        dialog.setContent(postMarkup);
        dialog.setTitle('Edit Post');
        dialog.setFooter(editForm);
        dialog.open();
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
  