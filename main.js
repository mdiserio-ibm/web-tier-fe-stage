function recuperaDatiMostra() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
      populatePost(posts);
    })
    .catch(error => console.error('Errore nel recupero dei dati:', error));
}

function populatePost(posts) {
  const postList = document.getElementById('post-list');

  postList.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.classList.add('shadow-sm', 'pt-4', 'col-md-12', 'col-lg-6', 'col-xl-4');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.classList.add('card-text');
    body.textContent = post.body;

    const button = document.createElement('button');
    button.textContent = 'Visualizza Singolo';
    button.classList.add('show-single-button');

    pulsantePremuto(button, post);

    cardBody.appendChild(title);
    cardBody.appendChild(body);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    postList.appendChild(card);
  });
}

function pulsantePremuto(button, post){ 
    button.addEventListener('click', (e) => {
        const elementi = document.querySelector(".cards");
        elementi.remove();
        mostraPostSingolo(post);

    });
}

function tornaIndietro(button){ 
    button.addEventListener('click', (e) => {
        const cards2 = document.querySelector("containerSingolo");
        cards2.remove();

    });
}

function mostraPostSingolo(post) {

    const cardBody = document.createElement('containerSingolo');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = post.title;

    const body = document.createElement('p');
    body.classList.add('card-text');
    body.textContent = post.body;

    const button = document.createElement('button');
    button.textContent = 'Torna indietro';
    button.classList.add('show-single-button');

    const cards2 = document.querySelector(".cards2");
    cards2.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(body);
    cardBody.appendChild(button);

    tornaIndietro(button);

}

recuperaDatiMostra();
