// --------------------------------------------------------------

	// The best movie

// --------------------------------------------------------------
/*
async function getBestMovie(){

    // Récupérer les données depuis l'API pour le meilleur film
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const movies = await response.json();
    const res = await fetch(movies.results[0].url)
    const bestMovie = await res.json();

    // Créer la section pour le carrousel
    const bestMovieSection = document.createElement('section');
    bestMovieSection.id = 'best-movie';
    // Créer une div 
    const bestMovieInfosDiv = document.createElement('div');
    bestMovieInfosDiv.id = 'best-movie-infos';
    // Créer le titre
    const titleElement = document.createElement('h1');
    titleElement.innerText = bestMovie.title
    bestMovieInfosDiv.appendChild(titleElement);
    const textElement = document.createElement('p');

    const moviePage = await fetch(bestMovie.url);
    const movieDetails = await moviePage.json();
    textElement.innerText = movieDetails.long_description;
    bestMovieInfosDiv.appendChild(textElement);
    const buttonElement = document.createElement('button');
    buttonElement.id = "myBtn"
    bestMovieInfosDiv.appendChild(buttonElement);

    const imageElement = document.createElement('img');
    imageElement.src = bestMovie.image_url
    imageElement.alt = bestMovie.title
    bestMovieInfosDiv.appendChild(imageElement);

    // Ajouter la div à la section
    bestMovieSection.appendChild(bestMovieInfosDiv);
    // Ajouter la section au document
    document.body.appendChild(bestMovieSection);

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    showMovieDetails(movieDetails);
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

}
*/
// --------------------------------------------------------------

	// Categories

// --------------------------------------------------------------
async function fetchData(url){
	const response = await fetch(url);
    const movies = await response.json();
	return movies
}

function createCarousel(movies,category){
	//Créer la section
	const carouselSection = document.createElement('section');
	carouselSection.id = category
	const leftBtn = document.createElement('button');
    leftBtn.classList.add('leftBtn');
    // Créer l'image de la flèche de gauche
    const leftArrowImg = document.createElement('img');
    leftArrowImg.src = "img/left-arrow.png";
    leftArrowImg.alt = "Left arrow";
    // Mettre l'image sur le bouton
    leftBtn.innerHTML = leftArrowImg;
    // Ajouter le bouton à la section
    carouselSection.appendChild(leftBtn)
    // Créer l'élément div
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('carousel');
    // Ajouter les images à la div du carousel
    for(let i=0;i<numberOfMovies; i++){
        const image = document.createElement('img')
        image.src = movies[i].image_url
        image.alt = movies[i].title
        if (i >= numberOfMoviesPerSlide) {
            image.style.display = "none"
        }
        carouselDiv.appendChild(image)
    }

    // Ajouter la section au document
    document.body.appendChild(carouselSection)
}

function getCategoryBestMovies(){
	const movies = fetchData(url)
    // Liste des meilleurs films de la catégorie
    let bestMovies = [];
    let i = 0;
    while (numberOfMovies>0 && i < movies.results.length){
    	const movie = fetchData(movies.results[i].url)
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    // Lien pour la page suivante
    const nextPageMovies = fetchData(movies.next)
    i = 0;
    while (numberOfMovies>0 && i < nextPageMovies.results.length){
        const movie = fetchData(movies.results[i].url)
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    console.log("Films");    
    console.log(bestMovies);
    createCarousel(bestMovies);
}



    

// --------------------------------------------------------------

	// Carousel

// --------------------------------------------------------------

function update_carousel(){
    let movies_images = [...document.getElementsByClassName('carousel')[0].children]
   
    movies_images.forEach((element, index)=>{
        if( index < 4){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
}

function leftArrow(section){
    let carousel = section.getElementsByClassName('carousel')[0];
    carousel.append(carousel.children.item(0));
    // Récupérer les éléments du carousel dans un tableau
    let images = carousel.getElementsByTagName('img');
    update_carousel()
}

function rightArrow(section){
    let carousel = section.getElementsByClassName('carousel')[0];
    carousel.prepend(carousel.children.item(carousel.children.length - 1));
    // Récupérer les éléments du caroussel dans un tableau
    let images = carousel.getElementsByTagName('img');
    update_carousel()
}

// --------------------------------------------------------------

	// Main

// --------------------------------------------------------------
//getBestMovie()

const config = {
	numberOfMovies = 7,
	numberOfMoviesPerSlide = 4
}

/*
// Récupérer l'id des boutons des carroussels cliqués uniquement
// Passer en paramètre des fonctions 
const carouselSection = document.getElementById('best-movies');
const leftBtn = carouselSection.getElementsByClassName('leftBtn')[0];
const rightBtn = carouselSection.getElementsByClassName('rightBtn')[0];

leftBtn.addEventListener('click', function(){
	leftArrow(carouselSection);
});

rightBtn.addEventListener('click', function(){
	rightArrow(carouselSection);
})

*/