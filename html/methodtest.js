// methodTest.js
export function initMethodTest() {
    document.getElementById('date').value = new Date().toLocaleString();

    const btns = ['postBtn', 'getBtn', 'putBtn', 'deleteBtn'];
    const methods = ['POST', 'GET', 'PUT', 'DELETE'];
    const urls = {
        POST: 'https://httpbin.org/post',
        GET: 'https://httpbin.org/get',
        PUT: 'https://httpbin.org/put',
        DELETE: 'https://httpbin.org/delete'
    };

    btns.forEach((btn, idx) => {
        document.getElementById(btn).addEventListener('click', () => {
            const method = methods[idx];
            const url = urls[method];
            fetchApi(url, method);
        });
    });
}

function fetchApi(url, method) {
    const data = new FormData(document.getElementById('testForm'));
    const obj = Object.fromEntries(data.entries());
    const init = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    };
    if (method === 'GET' || method === 'DELETE') {
        delete init.body;
    }
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerHTML = jsonToTable(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function jsonToTable(obj) {
    let html = '<table border="1" cellpadding="8">';
    Object.entries(obj).forEach(([key, value]) => {
        html += `<tr><td>${key}</td><td>${value}</td></tr>`;
    });
    html += '</table>';
    return html;
}

