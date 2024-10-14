// Function for Synchronous XMLHttpRequest
function fetchDataSync() {
    const referenceData = getJSONSync('data/reference.json');
    const data1 = getJSONSync(`data/${referenceData.data_location}`);
    const data2 = getJSONSync(`data/${data1.data_location}`);
    const data3 = getJSONSync('data/data3.json');

    const allData = [...data1.data, ...data2.data, ...data3.data];
    displayData(allData);
}

function getJSONSync(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // synchronous
    xhr.send();

    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    }
}

// Function for Asynchronous XMLHttpRequest with Callbacks
function fetchDataAsync() {
    getJSONAsync('data/reference.json', function(referenceData) {
        getJSONAsync(`data/${referenceData.data_location}`, function(data1) {
            getJSONAsync(`data/${data1.data_location}`, function(data2) {
                getJSONAsync('data/data3.json', function(data3) {
                    const allData = [...data1.data, ...data2.data, ...data3.data];
                    displayData(allData);
                });
            });
        });
    });
}

function getJSONAsync(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // asynchronous
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

// Function for Fetch with Promises
function fetchDataWithFetch() {
    fetch('data/reference.json')
    .then(response => response.json())
    .then(referenceData => fetch(`data/${referenceData.data_location}`))
    .then(response => response.json())
    .then(data1 => fetch(`data/${data1.data_location}`)
        .then(response => response.json())
        .then(data2 => fetch('data/data3.json')
            .then(response => response.json())
            .then(data3 => {
                const allData = [...data1.data, ...data2.data, ...data3.data];
                displayData(allData);
            })
        )
    );
}

// Function to display data in table
function displayData(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // clear previous data

    data.forEach(person => {
        const [name, surname] = person.name.split(' ');
        const row = `<tr>
            <td>${name}</td>
            <td>${surname}</td>
            <td>${person.id}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Event listeners for buttons
document.getElementById('syncButton').addEventListener('click', fetchDataSync);
document.getElementById('asyncButton').addEventListener('click', fetchDataAsync);
document.getElementById('fetchButton').addEventListener('click', fetchDataWithFetch);
