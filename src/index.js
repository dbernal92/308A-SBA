document.getElementById("darkModeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

async function fetchData() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = "";

    try {
        const bookInfoSearch = document.getElementById("searchInput").value.trim().toLowerCase();
        if (!bookInfoSearch) return;

        const query = bookInfoSearch.replace(/\s+/g, "+");
        const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);

        if (!response.ok) {
            throw new Error("Could not find resource!");
        }

        const data = await response.json();
        const results = data.docs.slice(0, 15);
        console.log(results);

        results.forEach(element => {
            const bookEntry = document.createElement('div');
            bookEntry.classList.add("book-card");
            resultsContainer.appendChild(bookEntry);

            const bookCover = document.createElement('img');
            bookCover.src = element.cover_i
                ? `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`
                : "https://placehold.co/200x300";
            bookCover.alt = element.title;
            bookEntry.appendChild(bookCover);

            const bookTitle = document.createElement('h3');
            bookTitle.textContent = element.title || "Untitled";
            bookEntry.appendChild(bookTitle);

            const bookAuthor = document.createElement('p');
            if (element.author_name) {
                const maxAuthors = 3; // Change this to show more or fewer names
                const authors = element.author_name.slice(0, maxAuthors).join(", ");
                bookAuthor.textContent = element.author_name.length > maxAuthors ? `${authors}, ...` : authors;
            } else {
                bookAuthor.textContent = "Unknown Author";
            }
            bookEntry.appendChild(bookAuthor);

        });
    } catch (error) {
        console.error(error);
    }
}

document.getElementById("searchButton").addEventListener("click", fetchData);
