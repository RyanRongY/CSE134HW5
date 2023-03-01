import DOMPurify from 'https://cdn.skypack.dev/dompurify@2.3.1';

const postTemplate = document.querySelector('#post-template');
const editDialogTemplate = document.querySelector('#edit-dialog-template');

let posts = [];

function renderPosts() {
  const postsContainer = document.querySelector('#posts');
  postsContainer.innerHTML = '';
  posts.forEach((post) => {
    const postElement = postTemplate.content.cloneNode(true);
    postElement.querySelector('h3').textContent = post.title;
    postElement.querySelector('p:nth-of-type(1)').textContent = post.date;
    postElement.querySelector('p:nth-of-type(2)').textContent = post.summary;
    postElement.querySelector('.edit-button').addEventListener('click', () => {
      showEditDialog(post);
    });
    postElement.querySelector('.delete-button').addEventListener('click', () => {
      deletePost(post);
    });
    postsContainer.appendChild(postElement);
  });
}

function addPost(title, date, summary) {
  const newPost = {
    id: Date.now().toString(),
    title,
    date,
    summary
  };
  posts.push(newPost);
  renderPosts();
}

function deletePost(post) {
  const index = posts.indexOf(post);
  if (index >= 0) {
    posts.splice(index, 1);
    renderPosts();
  }
}

function showEditDialog(post) {
  const dialog = editDialogTemplate.content.cloneNode(true).querySelector('dialog');
  const titleInput = dialog.querySelector('#title');
  const dateInput = dialog.querySelector('#date');
  const summaryInput = dialog.querySelector('#summary');

  titleInput.value = post.title;
  dateInput.value = post.date;
  summaryInput.value = post.summary;

  dialog.showModal();

  dialog.addEventListener('close', () => {
    const title = titleInput.value.trim();
    const date = dateInput.value;
    const summary = DOMPurify.sanitize(summaryInput.value.trim());

    if (dialog.returnValue === 'save' && title && date && summary) {
      post.title = title;
      post.date = date;
      post.summary = summary;
      renderPosts();
    }
  });

  dialog.querySelector('.close-button').addEventListener('click', () => {
    dialog.returnValue = 'cancel';
    dialog.close();
  });

  dialog.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    dialog.returnValue = 'save';
    dialog.close();
  });
}

function init() {
  // Pre-populate the data store with some sample posts
  addPost('First Post', '2022-01-01', 'This is the first post');
  addPost('Second Post', '2022-02-01', 'This is the second post');

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

init();
