// fetch("https://openlibrary.org/search.json?q=harry+potter")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

async function fetchData() {
    try {

        const bookInfoSearch = document.getElementById("searchInput").value.trim().toLowerCase();
        const query = bookInfoSearch.replace(/\s+/g, "+")
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);

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