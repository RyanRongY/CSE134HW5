document.addEventListener('DOMContentLoaded', () => {
    const id = document.getElementById('id');
    const articleName = document.getElementById('article_name');
    const articleBody = document.getElementById('article_body');
    const date = document.getElementById('date');
    const responseOutput = document.getElementById('response');
    const postBtn = document.getElementById('postBtn');
    const getBtn = document.getElementById('getBtn');
    const putBtn = document.getElementById('putBtn');
    const deleteBtn = document.getElementById('deleteBtn');
  
    date.value = new Date().toLocaleString();
  
    postBtn.addEventListener('click', () => sendRequest('POST', 'https://httpbin.org/post'));
    getBtn.addEventListener('click', () => sendRequest('GET', 'https://httpbin.org/get'));
    putBtn.addEventListener('click', () => sendRequest('PUT', 'https://httpbin.org/put'));
    deleteBtn.addEventListener('click', () => sendRequest('DELETE', 'https://httpbin.org/delete'));
  
    function sendRequest(method, url) {
      const requestOptions = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: id.value,
          article_name: articleName.value,
          article_body: articleBody.value,
          date: date.value
        })
      };
  
      if (method === 'GET' || method === 'DELETE') {
        delete requestOptions.body;
      }
  
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((json) => {
          responseOutput.innerHTML = `<pre>${JSON.stringify(json, null, 2)}</pre>`;
        })
        .catch((error) => {
          responseOutput.innerHTML = `Error: ${error}`;
        });
    }
  });
  