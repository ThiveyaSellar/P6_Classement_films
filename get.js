// 4 images sont affichées
// 3 images sont cachées


function leftArrow(){
    let content = document.getElementsByClassName('carousel')[0];
    content.append(content.children.item(0));
    // Récupérer les éléments du carousel dans un tableau
    let carousel = document.getElementsByClassName('carousel')[0];
    let images = carousel.getElementsByTagName('img');
    //console.log(images);
    update_carousel()
}

function rightArrow(){
    let content = document.getElementsByClassName('carousel')[0];
    console.log(content.children.item(content.children.length-1))
    content.prepend(content.children.item(content.children.length - 1));
    // Récupérer les éléments du carousel dans un tableau
    let carousel = document.getElementsByClassName('carousel')[0];
    let images = carousel.getElementsByTagName('img');
    console.log(images);
    update_carousel()
}

function update_carousel(){
    console.log(document.getElementsByClassName('carousel'))
    let movies_images = [...document.getElementsByClassName('carousel')[0].children]
   
    movies_images.forEach((element, index)=>{
        if( index < 4){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
}

/*
    Meilleur film celui qui a le meilleur score  
*/
async function getBestMovie(){

    // Récupérer les données depuis l'API pour le meilleur film
    const response = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score");
    const movies = await response.json();
    const res = await fetch(movies.results[0].url)
    const bestMovie = await res.json();

    const bestMovieSection = document.getElementById('best-movie');
    const bestMovieInfosDiv = document.getElementById('best-movie-infos');

    const titleElement = bestMovieInfosDiv.getElementsByTagName('h1')[0];
    titleElement.innerText = bestMovie.title

    const textElement = bestMovieInfosDiv.getElementsByTagName('p')[0];
    const moviePage = await fetch(bestMovie.url);
    const movieDetails = await moviePage.json();
    textElement.innerText = movieDetails.long_description;

    const buttonElement = document.getElementById('myBtn')
    console.log(buttonElement)
    buttonElement.removeAttribute("hidden");

    const imageElement = document.createElement('img');
    imageElement.src = bestMovie.image_url
    imageElement.alt = bestMovie.title
    bestMovieSection.appendChild(imageElement);


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

async function test(id){
    //Récupérer l'id de l'image
    //console.log(elementImg.id)
    const rep = await fetch(`http://127.0.0.1:8000/api/v1/titles/${id}`);
    console.log(rep)
    const film = await rep.json();

    showMovieDetails(film)
}

async function blabla(id, url, category, numberOfMovies, numberOfMoviesPerSlide){
    const response = await fetch(url);
    const movies = await response.json();
    // Liste des meilleurs films de la catégorie
    let bestMovies = [];
    let i = 0;
    while (numberOfMovies>0 && i < movies.results.length){
        const res = await fetch(movies.results[i].url);
        const movie = await res.json();
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    // Lien pour la page suivante
    const nextUrl = movies.next
    const nextPage = await fetch(nextUrl);
    const nextPageMovies = await nextPage.json();
    i = 0;
    while (numberOfMovies>0 && i < nextPageMovies.results.length){
        const res = await fetch(movies.results[i].url);
        const movie = await res.json();
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    console.log("Films")    
    console.log(bestMovies);

    // Utiliser les données
    // Créer la section qui va contenir le carousel 
    const section = document.createElement('section');
    // Ajouter l'id au carousel
    section.id = id
    // Ajouter <button class="leftBtn" onclick="leftArrow()"><img src="img/left-arrow.png"/></button>
    const btnLeft = document.createElement('button');
    btnLeft.class = "leftBtn";
    btnLeft.onclick = function() {leftArrow()}
    const leftIcon = document.createElement('img');
    leftIcon.src = "img/left-arrow.png";
    btnLeft.appendChild(leftIcon);
    section.appendChild(btnLeft)
    const div = document.createElement('div')
    div.className = "carousel"
    for(let i=0;i<7; i++){
        console.log(i)
        const image = document.createElement('img')
        image.src = bestMovies[i].image_url
        if (i >= numberOfMoviesPerSlide) {
            image.style.display = "none"
        }
        div.appendChild(image)
    }
    section.appendChild(div)
    const btnRight = document.createElement('button');
    btnRight.class = "rightBtn";
    btnRight.onclick = function() {rightArrow()}
    const rightIcon = document.createElement('img');
    rightIcon.src = "img/right-arrow.png";
    btnRight.appendChild(rightIcon);
    section.appendChild(btnRight)

    const main = document.getElementsByTagName('main')[0];
    main.appendChild(section)

    // Ajouter event listener

}

async function getCategoryBestMovies(id, url, category, numberOfMovies, numberOfMoviesPerSlide){
    const response = await fetch(url);
    const movies = await response.json();
    // Liste des meilleurs films de la catégorie
    let bestMovies = [];
    let i = 0;
    while (numberOfMovies>0 && i < movies.results.length){
        const res = await fetch(movies.results[i].url);
        const movie = await res.json();
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    // Lien pour la page suivante
    const nextUrl = movies.next
    const nextPage = await fetch(nextUrl);
    const nextPageMovies = await nextPage.json();
    i = 0;
    while (numberOfMovies>0 && i < nextPageMovies.results.length){
        const res = await fetch(movies.results[i].url);
        const movie = await res.json();
        bestMovies.push(movie);
        i++;
        numberOfMovies--;
    }
    console.log("Films")    
    console.log(bestMovies);

    const container = document.createElement('div');
    container.className = "container-fluid";
    const title = document.createElement('h1');
    container.appendChild(title);
    const carouselDiv = document.createElement('div');
    carouselDiv.classList.add("carousel","slide");
    carouselDiv.id = id;
    const carouselInner = document.createElement('div');
    carouselInner.classList.add("carousel-inner","carousel-grid");
    const carouselActiveItem = document.createElement('div');
    carouselActiveItem.classList.add("carousel-item","active");
    const carouselItem = document.createElement('div');
    carouselItem.classList.add("carousel-item");
    // Ajout 1
    const rowActive = document.createElement('div');
    rowActive.classList.add("row","justify-content-center");
    let j = 0;
    console.log("Après");
    console.log(j);
    while(j < numberOfMoviesPerSlide && j < bestMovies.length){
        let columnDiv = document.createElement('div');
        columnDiv.className = "col-2";
        let elementImg = document.createElement('img');
        elementImg.src = bestMovies[j].image_url;
        elementImg.alt = bestMovies[j].title;
        elementImg.setAttribute("id",bestMovies[j].id);
        elementImg.classList.add("d-block","w-100");
        columnDiv.appendChild(elementImg);
        rowActive.appendChild(columnDiv);
        j++;
    }
    // Ajout 2
    const row = document.createElement('div');
    row.classList.add("row","justify-content-center");
    console.log("Tets")
    while(j < j + numberOfMoviesPerSlide && j < bestMovies.length){
        let columnDiv = document.createElement('div');
        columnDiv.classList.add("col-2")
        let elementImg = document.createElement('img');
        movie = bestMovies[j]
        elementImg.src = movie.image_url;
        elementImg.alt = movie.title;
        elementImg.setAttribute("id",movie.id);
        elementImg.classList.add("d-block","w-100");
        elementImg.addEventListener("click", function(){
            // Get the modal
            var modal = document.getElementById("myModal");

            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];

            // When the user clicks on the button, open the modal
            elementImg.onclick = function() {
                test(elementImg.id)
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
        })
        columnDiv.appendChild(elementImg);
        row.appendChild(columnDiv);
        j++;
    }
    
    carouselActiveItem.appendChild(rowActive);
    carouselItem.appendChild(row);
    carouselInner.appendChild(carouselActiveItem);
    carouselInner.appendChild(carouselItem);
    carouselDiv.appendChild(carouselInner);
    
    // Bouton précédent
    const previousButton = document.createElement('button')
    previousButton.classList.add("carousel-control-prev");
    previousButton.type = "button";
    previousButton.setAttribute("data-bs-target",`#${id}`);
    previousButton.setAttribute("data-bs-slide","prev");
    previousButton.setAttribute('onclick',"leftArrow()")
    const previousIcon = document.createElement('span');
    previousIcon.classList.add("carousel-control-prev-icon");
    previousIcon.setAttribute("aria-hidden","true");
    const previousText = document.createElement("span");
    previousText.classList.add("visually-hidden");
    previousText.innerText = "Précédent";
    previousButton.appendChild(previousIcon);
    previousButton.appendChild(previousText);
    // Bouton suivant
    const nextButton = document.createElement('button')
    nextButton.classList.add("carousel-control-next");
    nextButton.type = "button";
    nextButton.setAttribute("data-bs-target",`#${id}`)
    nextButton.setAttribute("data-bs-slide","next");
    const nextIcon = document.createElement('span');
    nextIcon.classList.add("carousel-control-next-icon");
    nextIcon.setAttribute("aria-hidden","true");
    const nextText = document.createElement("span");
    nextText.classList.add("visually-hidden");
    nextText.innerText = "Suivant";
    nextButton.appendChild(nextIcon);
    nextButton.appendChild(nextText);

    carouselDiv.appendChild(previousButton);
    carouselDiv.appendChild(nextButton);
    container.appendChild(carouselDiv);
    title.innerText = category;
    document.body.appendChild(container);


}

async function showMovieDetails(movie){
    
    // Titre
    const title = document.getElementById("modalTitle");
    title.innerText = movie.title

    // Image
    const img = document.getElementsByClassName('modalImg')[0];
    img.src = movie.image_url;
    img.alt = movie.title;
    
    // Liste
    let list = document.getElementById("infos-list");

    list.innerHTML = "";

    showList(movie.genres,"Genres :", list);

    let date = document.createElement('li');
    date.innerText = `Date de sortie : ${movie.year}`;
    list.appendChild(date);

    let rated = document.createElement('li');
    rated.innerText = `Rated : ${movie.rated}`;
    list.appendChild(rated);

    let imdbScore = document.createElement('li');
    imdbScore.innerText = `Score imdb : ${movie.imdb_score}`;
    list.appendChild(imdbScore);

    /*
    const director = document.createElement('li');
    director.innerText = `Réalisateur : ${movie.directors}`;
    list.appendChild(director);
    */
    showList(movie.directors, movie.directors.length == 1 ? "Réalisateur :" : "Réalisateurs : ", list)
    /*
    const actors = document.createElement('li');
    const actorsList = document.createElement('ul');
    for(let actor of movie.actors){
        const actorElement = document.createElement('li');
        actorElement.innerText = actor;
        actorsList.appendChild(actorElement);
    }
    actors.innerText = "Acteurs : "
    actors.appendChild(actorsList);
    list.appendChild(actors);
    */
    
    showList(movie.actors,movie.actors.length == 1 ? "Acteur :" : "Acteurs : ", list);
    const duration = document.createElement('li');
    duration.innerText = `Durée : ${movie.duration}`;
    list.appendChild(duration);

    /*
    const country = document.createElement('li');
    country.innerText = `Pays : ${movie.countries}`;
    list.appendChild(country);
    */

    showList(movie.countries, "Pays : ", list);
    const worldwideGrossIncome = document.createElement('li');
    worldwideGrossIncome.innerText = `Box-office : ${movie.worldwide_gross_income}`;
    list.appendChild(worldwideGrossIncome);

    const description = document.createElement('li');
    description.innerText = `Résumé : ${movie.long_description}`;
    list.appendChild(description);

    // Récupération de l'élément dans lequel ajouter les éléments créer
    const imageRow = document.getElementById("movie-picture");
    imageRow.appendChild(img);
    const detailsRow = document.getElementsByClassName("modal-body")[0];
    //detailsRow.innerHTML="" //Ici
    detailsRow.appendChild(list);
    // Ajouter les éléments créer
    
}

function showList(movieElements, title, list){
    const elements = document.createElement('li');
    const elementList = document.createElement('ul');
    for(let element of movieElements){
        const elementElement = document.createElement('li');
        elementElement.innerText = element;
        elementList.appendChild(elementElement);
    }
    elements.innerText = title;
    elements.appendChild(elementList);
    list.appendChild(elements);
}



const numberOfMoviesPerCategory = 7;
getBestMovie();

/*
*/

const urlBestMovies = "http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score";
//blabla("best-movies", urlBestMovies,"Films les mieux notés",numberOfMoviesPerCategory,4);
//getCategoryBestMovies("best-movies", urlBestMovies,"Films les mieux notés",numberOfMoviesPerCategory,4);
/*
const urlAnimationMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score";
getCategoryBestMovies("category-animation", urlAnimationMovies, "Animation", numberOfMoviesPerCategory,4);
const urlCrimeMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=crime&sort_by=-imdb_score";
getCategoryBestMovies("category-crime", urlCrimeMovies, "Crime", numberOfMoviesPerCategory,4);
const urlThrillerMovies = "http://127.0.0.1:8000/api/v1/titles/?genre=thriller&sort_by=-imdb_score";
getCategoryBestMovies("category-thriller", urlThrillerMovies, "Thriller", numberOfMoviesPerCategory,4);
*/
//const movieInfos = getMovieDetails("1508669");
// Rendre générique et non qu'à 7 films
// Scroller les carousels
// Fenêtres modales avec toutes les informations



