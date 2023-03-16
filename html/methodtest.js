// Define a sendRequest function and export it as a module
export async function sendRequest(method, url, data) {
    const requestOptions = {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    if (method === 'GET' || method === 'DELETE') {
      delete requestOptions.body;
    }
  
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }
  
  // Add event listeners and call sendRequest function when the DOM is loaded
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
  
    postBtn.addEventListener('click', () => handleButtonClick('POST', 'https://httpbin.org/post'));
    getBtn.addEventListener('click', () => handleButtonClick('GET', 'https://httpbin.org/get'));
    putBtn.addEventListener('click', () => handleButtonClick('PUT', 'https://httpbin.org/put'));
    deleteBtn.addEventListener('click', () => handleButtonClick('DELETE', 'https://httpbin.org/delete'));
  
    async function handleButtonClick(method, url) {
      const data = {
        id: id.value,
        article_name: articleName.value,
        article_body: articleBody.value,
        date: date.value
      };
      try {      
        const json = await sendRequest(method, url, data);
        responseOutput.innerHTML = `<pre>${JSON.stringify(json, null, 2)}</pre>`;
      } catch (error) {
        responseOutput.innerHTML = `Error: ${error}`;
      }
    }
  });
  
       
  