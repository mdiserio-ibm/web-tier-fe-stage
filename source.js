"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function footerCopyYearHandler() {
    let paragraph = document.getElementById("footer-copy");
    let thisYear = new Date().getFullYear();
    let tempString = "&copy; ${thisYear} Posts";
    tempString = tempString.replace("${thisYear}", thisYear.toString());
    paragraph && (paragraph.innerHTML = tempString);
}
function fetchPosts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) {
                throw new Error("Request Error");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("There's been an error:", error);
            return [];
        }
    });
}
function showPosts(posts) {
    let postsGrid = document.getElementById("posts-grid");
    posts.forEach((post) => {
        if (postsGrid) {
            let lastRow = postsGrid.lastElementChild;
            if (lastRow) {
                if (lastRow.childElementCount < 2) {
                    addPostCardToRow(post, lastRow);
                }
                else {
                    let newRow = document.createElement("div");
                    newRow.classList.add("row");
                    newRow.classList.add("justify-content-center");
                    postsGrid.appendChild(newRow);
                    addPostCardToRow(post, newRow);
                }
            }
        }
    });
}
function addPostCardToRow(post, row) {
    let postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.classList.add("col-6");
    postCard.classList.add("my-3");
    postCard.classList.add("mx-2");
    let postTitle = document.createElement("div");
    postTitle.classList.add("post-card-title");
    postTitle.textContent = post.title;
    let postText = document.createElement("div");
    postText.classList.add("post-card-text");
    postText.textContent = post.body;
    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("btn", "btn-outline-primary", "post-card-button");
    button.textContent = "Show More";
    button.onclick = function () {
        //TODO: navigate to post.html and pass the postId, then make the fetch in there and fill the post details divs 
    };
    postCard.appendChild(postTitle);
    postCard.appendChild(postText);
    postCard.appendChild(button);
    row.appendChild(postCard);
}
fetchPosts()
    .then((posts) => {
    showPosts(posts);
})
    .catch((error) => {
    console.error("There's been an error:", error);
});
footerCopyYearHandler();
