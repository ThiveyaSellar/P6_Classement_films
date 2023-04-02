async function getBestMovie(){
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const movies = await response.json();
    let bestMovie = movies['results'][0];

    // Créer l'élément h1 pour le titre
    const titleElement = document.createElement('h1');
    titleElement.innerText = bestMovie.title
    
    // Créer l'élément button pour le bouton qui ouvre la fenêtre modale
    const buttonElement = document.createElement('a');
    buttonElement.innerText = "Plus d'informations"
    buttonElement.classList.add("btn","btn-primary")
    buttonElement.href = "#"
    buttonElement.role = "button"

    // Créer l'élément img pour afficher l'image
    const imageElement = document.createElement('img');
    imageElement.src = bestMovie.image_url
    imageElement.alt = bestMovie.title

    // Créer l'élément p pour la description
    const textElement = document.createElement('p');
    const moviePage = await fetch(bestMovie.url);
    const movieDetails = await moviePage.json();
    textElement.innerText = movieDetails.long_description;

    // Ajouter les éléments au DOM et les afficher
    // Afficher
    const bestMovieDiv = document.getElementById('best-movie');
    const bestMovieDivChildren = bestMovieDiv.getElementsByTagName('div');
    bestMovieDivChildren[0].appendChild(titleElement);
    bestMovieDivChildren[0].appendChild(textElement);
    bestMovieDivChildren[0].appendChild(buttonElement);
    bestMovieDivChildren[1].appendChild(imageElement);
}


async function getCategoryBestMovies(id, url, numberOfMovies){
    // Si le nombre de films change par page ?
    let urls = [];
    const response = await fetch(url);
    const movies = await response.json();
    // Liste des meilleurs films de la catégorie
    let bestMovies = [];
    for(let movie of movies.results){
        bestMovies.push(movie);
    }
    // Lien pour la page suivante
    const nextUrl = movies.next
    const nextPage = await fetch(nextUrl);
    const nextPageMovies = await nextPage.json();
    bestMovies.push(nextPageMovies.results[0]);
    bestMovies.push(nextPageMovies.results[1]);
    console.log(bestMovies);
    

    const categoryCarouselDiv = document.getElementById(id);
    const carouselElement = categoryCarouselDiv.getElementsByClassName("carousel-inner")[0];

    // Créer un élément div pour le premier film
    const activeDiv = document.createElement('div');
    activeDiv.classList.add("carousel-item","active");
    const activeImg = document.createElement('img');
    activeImg.src = bestMovies[0].image_url;
    activeImg.alt = bestMovies[0].title;
    activeDiv.appendChild(activeImg);
    // Ajouter l'élément au DOM et afficher 
    carouselElement.appendChild(activeDiv);
    for (let i=1; i < bestMovies.length; i++){
        let elementDiv = document.createElement('div');
        elementDiv.classList.add("carousel-item"); 
        let elementImg = document.createElement('img');
        elementImg.src = bestMovies[i].image_url;
        elementImg.alt = bestMovies[i].title;
        elementDiv.appendChild(elementImg);
        carouselElement.appendChild(elementDiv);
    }

}


const numberOfMoviesPerCategory = 7;
getBestMovie();
const urlBestMovies = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score";
getCategoryBestMovies("best-movies", urlBestMovies, numberOfMoviesPerCategory);
const urlAnimationMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score";
getCategoryBestMovies("category-animation", urlAnimationMovies, numberOfMoviesPerCategory);
const urlCrimeMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=crime&sort_by=-imdb_score";
getCategoryBestMovies("category-crime", urlCrimeMovies, numberOfMoviesPerCategory);
const urlThrillerMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score";
getCategoryBestMovies("category-thriller", urlThrillerMovies, numberOfMoviesPerCategory);

// Rendre générique et non qu'à 7 films
// Scroller les caroussels
// Fenêtres modales avec toutes les informations