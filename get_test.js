const config = {
    numberOfMovies : 7,
    numberOfMoviesPerSlide : 4
}


// --------------------------------------------------------------

	// The best movie

// --------------------------------------------------------------
function createBestMovieSection(){
    const bestMovieSection = document.createElement('section');
    bestMovieSection.id = 'best-movie';
    return bestMovieSection;   
}

function createBestMovieInfosDiv(){
    const bestMovieInfosDiv = document.createElement('div');
    bestMovieInfosDiv.id = 'best-movie-infos';
    return bestMovieInfosDiv;
}

function createTitle(title){
    const titleElement = document.createElement('h1');
    titleElement.innerText = title
    return titleElement;
}

function createText(text){
    const textElement = document.createElement('p');
    textElement.innerText = text;
    return text;
}

function createButton(){
    const buttonElement = document.createElement('button');
    buttonElement.id = "myBtn";
    return buttonElement;
}

function createImage(url, title){
    const imageElement = document.createElement('img');
    imageElement.src = image_url
    imageElement.alt = title
    return imageElement;
}

function setModal(movieDetails){
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

async function getBestMovie(){
    const movies = await fetchData("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score")
    const bestMovie = await fetchData(movies.results[0].url)

    const bestMovieSection = createBestMovieSection();
    const bestMovieInfosDiv = createBestMovieInfosDiv();

    const title = createTitle(bestMovie.title);
    bestMovieInfosDiv.appendChild(title);

    const movieDetails = await fetchData(bestMovie.url);

    const movieDescription = createText(movieDetails.long_description)
    bestMovieInfosDiv.appendChild(movieDescription);

    const moreDetailsBtn = createButton(); 
    bestMovieInfosDiv.appendChild(moreDetailsBtn);

    const image = createImage(bestMovie.url, bestMovie.title)
    bestMovieInfosDiv.appendChild(image);

    bestMovieSection.appendChild(bestMovieInfosDiv);
    document.body.appendChild(bestMovieSection);

    setModal(movieDetails)
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


// --------------------------------------------------------------

    // Categories

// --------------------------------------------------------------

async function fetchData(url){
    const response = await fetch(url);
    const movies = await response.json();
    return movies
}

function getCarouselSection(category) {
    const carouselSection = document.createElement('section');
    carouselSection.id = category
    return carouselSection;
}

function getArrow(direction) {
    const btn = document.createElement('button');
    btn.classList.add(direction + 'Btn');
    // Créer l'image de la flèche de gauche
    const arrowImg = document.createElement('img');
    arrowImg.src = "img/"+direction+"-arrow.png";
    arrowImg.alt = direction + " arrow";

    // Mettre l'image sur le bouton
    btn.innerHTML = arrowImg;
    return btn;
}

function createCarouselDiv() {
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('carousel');
    return carouselDiv;
}

function manageCarouselImages(numberOfMovies, carouselDiv){
    // Ajouter les images à la div du carousel
    for(let i=0;i<numberOfMovies; i++){
        const image = createCarouselImg(movies[i]);
        if (i >= numberOfMoviesPerSlide) {
            image.style.display = "none"
        }
        carouselDiv.appendChild(image)
    }
}

function createCarousel(movies, category){
    const carouselSection = getCarouselSection(category);

    const leftBtn = getArrow("left");
    const rightBtn = getArrow("right");
    const carouselDiv = createCarouselDiv();

    carouselSection.appendChild(leftBtn)
    carouselSection.appendChild(rightBtn)
    carouselSection.appendChild(carouselDiv);

    manageCarouselImages(numberOfMovies, carouselDiv);

    // Ajouter la section au document
    document.body.appendChild(carouselSection)
}

// --------------------------------------------------------------

    // Main

// --------------------------------------------------------------

function main(config) {
    getBestMovie()
}

main(config)