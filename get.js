const config = {
    numberOfMovies : 7,
    numberOfMoviesPerSlide : 4
}

// --------------------------------------------------------------

	// Le meilleur film

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

function createButton(txt){
    const buttonElement = document.createElement('button');
    buttonElement.id = "myBtn";
    buttonElement.innerText=txt;
    return buttonElement;
}

function createImage(url, title){
    const imageElement = document.createElement('img');
    imageElement.src = url
    imageElement.alt = title
    return imageElement;
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

    const moreDetailsBtn = createButton("Plus d'informations"); 
    moreDetailsBtn.addEventListener("click",function(){
        const movieId = bestMovie.id
        setModal(movieId)
    })
    bestMovieInfosDiv.appendChild(moreDetailsBtn);

    const image = createImage(bestMovie.image_url, bestMovie.title)
    
    bestMovieSection.appendChild(bestMovieInfosDiv);
    bestMovieSection.appendChild(image);

    const mainElement = document.getElementsByTagName("main")[0];
    mainElement.appendChild(bestMovieSection);

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
    update_carousel(section)
}


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
    const title = createTitle(category);
    title.classList.add('category');
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
        image.addEventListener("click",function(){
            let movieId = movies[i].id
            setModal(movieId)
            openModal()
        })
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

    const baseUrl = `http://127.0.0.1:8000/api/v1/titles/?page_size=${config.numberOfMovies}&sort_by=-imdb_score`;
    const url = baseUrl;    
    const urlHistory = `${baseUrl}&genre=history`;    
    const urlCrime = `${baseUrl}&genre=crime`;
    const urlThriller = `${baseUrl}&genre=thriller`;

    getBestMovie()
    .then(() => {
    return fetchAndCreateCarousel(url, "best-movies", "Meilleurs films")
    })
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
    
}

function setModalHeaderMovieTitle(title){
    const modalTitle = document.getElementById("modalTitle");
    modalTitle.innerText = title
}

function createModalMoviePicture(source, title){
    const pictureDiv = document.createElement('div');
    pictureDiv.id = "movie-picture";
    const modalImage = document.createElement('img');
    modalImage.src = source;
    modalImage.alt = title;
    pictureDiv.appendChild(modalImage);

    return pictureDiv;
}

function createListItem(itemName, itemContent){
    const item = document.createElement('li');
    item.innerText = `${itemName} : ${itemContent}.`;
    return item;
}

function setModalMovieList(modalBody,movieDetails){

    const ulElement = document.createElement('ul');

    // Si données multiples écrire sur une ligne

    const items = [
        ["Titre", movieDetails.title],
        ["Genres", movieDetails.genres],
        ["Date de sortie", movieDetails.year],
        ["Rated", movieDetails.rated],
        ["Score Imdb", movieDetails.imdb_score],
        ["Réalisateur", movieDetails.directors],
        ["Acteurs", movieDetails.actors],
        ["Durée", `${movieDetails.duration} min`],
        ["Pays d'origine", movieDetails.countries],
        ["Box-office", movieDetails.worldwide_gross_income],
        ["Résumé", movieDetails.long_description]
    ]

    for(let i=0; i < items.length; i++){
        let itemName = items[i][0];
        let itemContent = items[i][1];

        if(typeof(itemContent) === "object" && itemContent !== null){
            itemContent = itemContent.join(', ')
        }

        if(itemContent === null){
            itemContent = "Inconnu";
        }

        var item = createListItem(itemName, itemContent)
        ulElement.appendChild(item)
    }

    modalBody.appendChild(ulElement);
}

async function setMovieDetails(modalBody, movieDetails){
    setModalHeaderMovieTitle(movieDetails.title)
    const moviePicture = createModalMoviePicture(movieDetails.image_url, movieDetails.title)
    modalBody.appendChild(moviePicture)
    setModalMovieList(modalBody, movieDetails)
}

function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

async function setModal(movieId){

    // Get the modal
    var modal = document.getElementById("myModal");
    var modalBody = modal.getElementsByClassName("modal-body")[0]

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Get movie details 
    const url = `http://127.0.0.1:8000/api/v1/titles/${movieId}`
    const movieDetails = await fetchData(url)

    // Set movie details
    modalBody.innerHTML = ""
    setMovieDetails(modalBody, movieDetails)

    // When the user clicks on the button, open the modal
    btn.addEventListener("click", openModal);


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


main(config)

