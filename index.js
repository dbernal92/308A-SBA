// fetch("https://openlibrary.org/search.json?q=harry+potter")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));

async function fetchData() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = "";
    try {

        const bookInfoSearch = document.getElementById("searchInput").value.trim().toLowerCase();
        const query = bookInfoSearch.replace(/\s+/g, "+")
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);

        if (!response.ok) {
            throw new Error("Could not find resource!");
        }

        const data = await response.json();
        const results = data.docs.slice(0, 10);
        console.log(results);

            results.forEach(element => {

                const bookEntry = document.createElement('div');
                resultsContainer.appendChild(bookEntry);
        
                const bookCover = document.createElement('img');
                bookCover.src = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
                bookEntry.appendChild(bookCover);
        
                const bookTitle = document.createElement('h3');
                bookTitle.textContent = element.title;
                bookEntry.appendChild(bookTitle);
        
                const bookAuthor = document.createElement('p');
                bookAuthor.textContent = element.author_name;
                bookEntry.appendChild(bookAuthor);
            });
    }
    catch (error) {
        console.error(error);
    }

}

document.getElementById("searchButton").addEventListener("click", fetchData);