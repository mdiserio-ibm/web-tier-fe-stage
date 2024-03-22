//FUNZIONE Footer Copyright Anno Updater

function footerCopyYearUpdater() {
  let paragraph = document.getElementById("footer-copyright");
  let thisYear = new Date().getFullYear();
  let tempString = "&copy; " + thisYear + " Posts";
  paragraph && (paragraph.innerHTML = tempString);
}

//POSTS

document.addEventListener("DOMContentLoaded", function () {
    const postContainer = document.getElementById("postContainer");
    const searchForm = document.getElementById("searchForm");

    // Funzione per ottenere e visualizzare i post dalla API
    async function fetchAndDisplayPosts() {
        try {
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/posts"
            );
            let posts = await response.json();

            // Ordina i post in base al titolo
            posts.sort((a, b) => a.title.localeCompare(b.title));

            // Creazione delle card per ogni post
            displayPosts(posts);
        } catch (error) {
            console.error(
                "Si è verificato un errore durante il recupero dei post:",
                error
            );
        }
    }

    // Funzione per mostrare i post
    function displayPosts(posts) {
        postContainer.innerHTML = ""; // Clear existing posts
        posts.forEach((post) => {
            const card = document.createElement("div");
            card.classList.add("col");
            card.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.body}</p>
                        <button type="button" class="btn btn-primary btn-detail" data-id="${post.id}">Info</button>
                    </div>
                </div>
            `;
            postContainer.appendChild(card);
        });
    }

    // Funzione per filtrare i post in base alla query di ricerca
    function filterPosts(posts, query) {
        return posts.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Gestione della ricerca
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        const searchInput = document.getElementById("searchInput").value;
        const filteredPosts = filterPosts(posts, searchInput);
        displayPosts(filteredPosts);
    });

    // Funzione per ottenere il dettaglio di un post
    async function fetchPostDetails(postId) {
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/posts/${postId}`
            );
            const post = await response.json();
            // Redirect alla pagina di dettaglio del post
            window.location.href = `post-detail.html?id=${postId}`;
        } catch (error) {
            console.error(
                "Si è verificato un errore durante il recupero dei dettagli del post:",
                error
            );
        }
    }

    // Gestione del click sul bottone "Info"
    postContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("btn-detail")) {
            const postId = event.target.getAttribute("data-id");
            fetchPostDetails(postId);
        }
    });

    fetchAndDisplayPosts();
});
