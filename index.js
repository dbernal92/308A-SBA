// fetch("https://openlibrary.org/search.json?q=harry+potter")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

async function fetchData(params) {
    try {
        const response = await fetch("https://openlibrary.org/search.json?q=harry+potter");

        if(!response.ok) {
            throw new Error("Could not find resource!");
        }

        const data = await response.json();
        console.log(data);
    }
    catch(error) {
        console.error(error);
    }
}

fetchData();