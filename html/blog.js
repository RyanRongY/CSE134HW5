import { openModal, closeModal } from './modal.js';

let posts = [
	{
		id: 1,
		title: 'First Post',
		date: '2023-03-02',
		summary: 'This is my first blog post!'
	},
	{
		id: 2,
		title: 'Second Post',
		date: '2023-03-03',
		summary: 'This is my second blog post!'
	},
	{
		id: 3,
		title: 'Third Post',
		date: '2023-03-04',
		summary: 'This is my third blog post!'
	},
];

const postTemplate = document.getElementById('post-template');
const postsContainer = document.getElementById('posts');
const addButton = document.getElementById('add-btn');
const modalTitle = document.getElementById('modal-title');
const modalForm = document.getElementById('modal-form');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const summaryInput = document.getElementById('summary-input');

let editMode = false;
let currentPost = null;

function renderPosts() {
	postsContainer.innerHTML = '';
	for (const post of posts) {
		const postItem = postTemplate.content.cloneNode(true);
		postItem.querySelector('.post-title').textContent = post.title;
		postItem.querySelector('.post-date').textContent = new Date(post.date).toLocaleDateString();
		postItem.querySelector('.post-summary').textContent = post.summary;
		postItem.querySelector('.edit-btn').addEventListener('click', () => {
			editPost(post);
		});
		postItem.querySelector('.delete-btn').addEventListener('click', () => {
			deletePost(post);
		});
		postsContainer.appendChild(postItem);
	}
}

function addPost() {
	editMode = false;
	currentPost = null;
	modalTitle.textContent = 'Add Post';
	titleInput.value = '';
	dateInput.value = '';
	summaryInput.value = '';
	openModal();
}

function savePost(event) {
	event.preventDefault();
	const title = titleInput.value.trim();
	const date = dateInput.value;
	const summary = summaryInput.value.trim();
	if (title === '' || date === '' || summary === '') {
		window.alert('Please fill in all fields.');
		return;
	}
	const id = currentPost ? currentPost.id : posts.length + 1;
	const post = { id, title, date, summary };
	if (currentPost) {
		const index = posts.findIndex(p => p.id === currentPost.id);
		posts[index] = post;
	} else {
		posts.push(post);
	}
	localStorage.setItem('posts', JSON.stringify(posts));
	renderPosts();
	closeModal();
}

function editPost(post) {
	editMode = true;
	currentPost = post;
	modalTitle.textContent = 'Edit Post';
	titleInput.value = post.title;
	dateInput.value = post.date;
	summaryInput.value = post.summary;
	openModal();
}

function deletePost(post) {
	const confirmDelete = window.confirm('Are you sure you want to delete this post?');
	if (confirmDelete) {
		const index = posts.findIndex(p => p.id === post.id);
		posts.splice(index, 1);
		localStorage.setItem('posts', JSON.stringify(posts));
		renderPosts();
	}
}

function getPosts() {
	const storedPosts = localStorage.getItem('posts');
	if (storedPosts) {
		posts = JSON.parse(storedPosts);
	}
}

getPosts();
addButton.addEventListener('click', addPost);
modalForm.addEventListener('submit', savePost);
document.getElementById('cancel-btn').addEventListener('click', closeModal);
renderPosts();
