/* https://jsonplaceholder.typicode.com/posts
https://jsonplaceholder.typicode.com/posts/:id */



// Variables Declarations

const urlPostList = "https://jsonplaceholder.typicode.com/posts";
let arrayCloned = [];


// Fetch URL and get All the POSTS DATA

const fetchPostList = () => {
return fetch(urlPostList)
       .then(response => response.json())
       .then(data => {
            arrayCloned = data;
            return populateCards(data); // OF THE PROMISE IS SUCCESSFUL WE CAN POPULATE THE CARDS WITH THE DATA BY PASSING IT TO THE FUNCTION AS PARAM
        })
       .catch(error => {
            console.log(error);
        });
    
}


// FUNCTION THAT SORT THE API DATA BY TITLE IN ALPHABETIC ORDER
const sortApiByTitle = (apiArray) => {
    return apiArray.sort((a, b) => a.title.localeCompare(b.title));
}
  
  //POPULATE THE CARDS WITH THE DATA
  
  const populateCards = (data) => {
      document.getElementById("card-wrapper").innerHTML = ""; // WE RESET THE HTML CONTENT AND THEN WE CREATE FOR EACH POST A CARD 
      const sortedApiData = sortApiByTitle(data); // CALL THE FUNCTION TO SORT THE API DATA BY TITLE IN ALPHABETIC ORDER
      sortedApiData.forEach(post => {
        const card = document.createElement("div");
        card.className = "col";
        card.className = "mb-4";
        card.innerHTML = `
            <div class="card h-100 shadow border-0 ">
                    <div class="card-body">
                        <p class="card-title post-title fw-bold">${post.title}</p>
                        <p class="card-text post-body">${post.body}</p>
                        <a href="#" class="btn btn-primary" onclick="getClientDetails('${post.id}')">View Details</a>
                    </div> 
            </div>
        `;
        document.getElementById("card-wrapper").appendChild(card); // AT THE END WE ADD THE CARD TO THE HTML CARD-WRAPPER
        // IN THE BOTTON WE ADD AN ONLCLIK THAT CALLS THE FUNCTION TO GET THE CLIENT DETAILS AND POPULATE THE PAGE ACCORDING TO THE REQUEST AND PASSING THE ID
    })
}

// SEARCH HANDLER

const searchHandler = () => {
    document.getElementById('search-button').addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value;
        const filteredData = filterData(arrayCloned, searchTerm);
        document.getElementById('search-input').value = "";
        populateCards(filteredData);
    })
}

// FUNCTION THAT FILTERS SEARCHED DATA

const filterData = (arrayCloned, searchTerm) => {
    return arrayCloned.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.body.toLowerCase().includes(searchTerm.toLowerCase()));
  }


// FETCH URL AND GET THE CLIENT DETAILS THROUGH ID

const getClientDetails = (id) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response => response.json())
    .then(data => {
        return populateClientDetail(data);
    })
    .catch(error => {
        console.log(error);
    });
    
}


// POPULATE THE PAGE WITH CLIENT DETAILS

const populateClientDetail = (data) => {
        document.getElementById("card-wrapper").innerHTML = "";
        document.getElementById("client-detail").innerHTML = "";
        document.getElementById("client-detail").innerHTML = `
         <div class="col">
                <h2 class="fw-bold">${data.title}</h2>
                <p>${data.body}</p>
                <a href="index.html" class="btn btn-danger">Back to Home</a>
         </div>
        `;
}


//Function Call ONLOAD

window.onload = () => {
    fetchPostList();
    searchHandler();
}



