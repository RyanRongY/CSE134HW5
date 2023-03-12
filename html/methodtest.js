// function to get current date and time in ISO format
function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var dateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
    return dateTime;
}

// function to format JSON response to HTML table
function formatJSONToHTMLTable(jsonData) {
    var table = '<table border="1">';
    for (var key in jsonData) {
        table += '<tr>';
        if (typeof jsonData[key] === 'object') {
            table += '<td colspan="2"><b>' + key + ':</b></td>';
            table += '</tr><tr><td colspan="2">';
            table += formatJSONToHTMLTable(jsonData[key]);
            table += '</td>';
        } else {
            table += '<td><b>' + key + ':</b></td>';
            table += '<td>' + jsonData[key] + '</td>';
            table += '</tr>';
        }
    }
    table += '</table>';
    return table;
}

document.getElementById("date").value = getCurrentDateTime();

document.getElementById("postBtn").addEventListener("click", function() {
    var id = document.getElementById("id").value;
    var article_name = document.getElementById("article_name").value;
    var article_body = document.getElementById("article_body").value;
    var date = document.getElementById("date").value;

    var data = {
        "id": id,
        "article_name": article_name,
        "article_body": article_body,
        "date": date
    };

    fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerHTML = formatJSONToHTMLTable(data);
    })
    .catch(error => console.error(error));
});

document.getElementById("getBtn").addEventListener("click", function() {
    fetch('https://httpbin.org/get')
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerHTML = formatJSONToHTMLTable(data);
    })
    .catch(error => console.error(error));
});

document.getElementById("putBtn").addEventListener("click", function() {
    var id = document.getElementById("id").value;
    var article_name = document.getElementById("article_name").value;
    var article_body = document.getElementById("article_body").value;
    var date = document.getElementById("date").value;

    var data = {
        "id": id,
        "article_name": article_name,
        "article_body": article_body,
        "date": date
    };

    fetch('https://httpbin.org/put', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerHTML = formatJSONToHTMLTable(data);
    })
    .catch(error => console.error(error));
});

document.getElementById("deleteBtn").addEventListener("click", function() {
    fetch('https://httpbin.org/delete', {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerHTML = formatJSONToHTMLTable(data);
    })
    .catch(error => console.error(error));
});