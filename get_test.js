const config = {
    numberOfMovies : 7,
    numberOfMoviesPerSlide : 4
}

function test(element){
    console.log("---------------------------")
    console.log(element)
    console.log("---------------------------")
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
    return textElement;
}

function createButton(){
    const buttonElement = document.createElement('button');
    buttonElement.id = "myBtn";
    return buttonElement;
}

function createImage(url, title){
    const imageElement = document.createElement('img');
    imageElement.src = url
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

    const image = createImage(bestMovie.image_url, bestMovie.title)
    bestMovieInfosDiv.appendChild(image);

    bestMovieSection.appendChild(bestMovieInfosDiv);
    document.body.appendChild(bestMovieSection);

    setModal(movieDetails)
}    

// --------------------------------------------------------------

	// Carousel

// --------------------------------------------------------------

function update_carousel(section){
    let movies_images = [...section.getElementsByClassName('carousel')[0].children]
   
    movies_images.forEach((element, index)=>{
        if( index < config.numberOfMoviesPerSlide){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
}

function rightArrow(section){
    let carousel = section.getElementsByClassName('carousel')[0];
    carousel.append(carousel.children.item(0));
    // Récupérer les éléments du carousel dans un tableau
    let images = carousel.getElementsByTagName('img');
    update_carousel(section)
}

function leftArrow(section){
    let carousel = section.getElementsByClassName('carousel')[0];
    carousel.prepend(carousel.children.item(carousel.children.length - 1));
    // Récupérer les éléments du caroussel dans un tableau
    let images = carousel.getElementsByTagName('img');
    update_carousel()
}

// --------------------------------------------------------------

	// Main

// --------------------------------------------------------------


// Récupérer l'id des boutons des carroussels cliqués uniquement




// --------------------------------------------------------------

    // Categories

// --------------------------------------------------------------

async function fetchData(url){
    const response = await fetch(url);
    const movies = await response.json();
    return movies
}


function createCarouselSection(sectionId, category) {
    const carouselSection = document.createElement('section');
    carouselSection.id = sectionId;
    //carouselSection.classList.add('carousel-section');
    const title = createTitle(category);
    carouselSection.appendChild(title);
    return carouselSection;
}

function getArrow(direction) {
    const btn = document.createElement('button');
    btn.classList.add(direction + 'Btn');
    // Créer l'image de la flèche de gauche
    const arrowImg = document.createElement('img');
    arrowImg.src = "img/"+direction+"-arrow.png";
    arrowImg.alt = direction + " arrow";

    btn.innerHTML = arrowImg.outerHTML;

    return btn;
}

function createCarouselDiv() {
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add('carousel');
    return carouselDiv;
}

function manageCarouselImages(movies, numberOfMovies, carouselDiv){
    // Ajouter les images à la div du carousel
    for(let i=0;i<numberOfMovies; i++){
        const image = createCarouselImg(movies[i]);
        if (i >= config.numberOfMoviesPerSlide) {
            image.style.display = "none"
        }
        carouselDiv.appendChild(image)
    }
}

function createCarousel(movies, sectionId, category){
    const mainElement = document.getElementsByTagName("main")[0];
    const carouselSection = createCarouselSection(sectionId, category);

    const leftBtn = getArrow("left");
    const rightBtn = getArrow("right");
    const carouselDiv = createCarouselDiv();

    const carouselElementsDiv = document.createElement('div');
    carouselElementsDiv.classList.add('carousel-section');
    

    leftBtn.addEventListener('click', function(){
        leftArrow(carouselSection);
    });

    rightBtn.addEventListener('click', function(){
        rightArrow(carouselSection);
    });

    carouselElementsDiv.appendChild(leftBtn);
    carouselElementsDiv.appendChild(carouselDiv);
    carouselElementsDiv.appendChild(rightBtn);

    carouselSection.appendChild(carouselElementsDiv)

    manageCarouselImages(movies, config["numberOfMovies"], carouselDiv);

    // Ajouter la section au document
    // document.body.appendChild(carouselSection)
    mainElement.appendChild(carouselSection)
}

function createCarouselImg(movie) {
    const imageUrl = movie.image_url
    const image = document.createElement('img')
    image.alt = movie.title
    image.src = imageUrl
    
    return image;
}

async function fetchAndCreateCarousel(url, sectionId, category){
    const movies = await fetchData(url)
    createCarousel(movies.results, sectionId, category) 
}

// --------------------------------------------------------------

    // Main

// --------------------------------------------------------------

function main(config) {
    // Première section : afficher le meilleur film
    getBestMovie()

    // Deuxième section : afficher les caroussels selon les catégories

    // HTML pur
    /*
    const carouselSection = document.getElementById('html-pur');
    const leftBtn = carouselSection.getElementsByClassName('leftBtn')[0];
    const rightBtn = carouselSection.getElementsByClassName('rightBtn')[0];

    leftBtn.addEventListener('click', function(){
        leftArrow(carouselSection);
    });

    rightBtn.addEventListener('click', function(){
        rightArrow(carouselSection);
    });
    */

    /*
    const baseUrl = `http://127.0.0.1:8000/api/v1/titles/?page_size=${config.numberOfMovies}&sort_by=-imdb_score`;
    const url = baseUrl;    
    const urlHistory = `${baseUrl}&genre=history`;    
    const urlCrime = `${baseUrl}&genre=crime`;
    const urlThriller = `${baseUrl}&genre=thriller`;

    fetchAndCreateCarousel(url, "best-movies", "Meilleurs films")
    .then(() => {
    return fetchAndCreateCarousel(urlHistory, "history", "Historique");
    })
    .then(() => {
    return fetchAndCreateCarousel(urlCrime, "crime", "Crime");
    })
    .then(() => {
    return fetchAndCreateCarousel(urlThriller, "thriller", "Thriller");
    })
    .catch((error) => {
    console.error(error);
    });
    */

}

main(config)

