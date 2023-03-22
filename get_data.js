// Chercher le meilleur film
// Requête vers la page principale
fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score")
.then(function(res) {
if (res.ok) {
    return res.json();
}
})
.then(function(value) {
// Récupérer le film qui a la meilleur note sur cette page
//console.log(value)
result = value['results'][0]
// Récupérer la div du meilleur film
console.log(document);
var bestMovieDiv = document.getElementById('best-movie')
var bestMovieDivChildren = bestMovieDiv.getElementsByTagName('div')
// Créer un élément pour le titre
bestMovieTitle = document.createElement('h1')
bestMovieTitle.innerHTML = result['title']
bestMovieDivChildren[0].appendChild(bestMovieTitle)
bestMovieButton = document.createElement('button')
bestMovieButton.innerHTML = "Plus d'information"
bestMovieDivChildren[0].appendChild(bestMovieButton)
fetch(result['url'])
    .then(function(res) {
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value){
        //console.log(value['long_description'])
        bestMovieDescription = document.createElement('p')
        bestMovieDescription.innerHTML = value['long_description']
        bestMovieDivChildren[0].appendChild(bestMovieDescription)
    })
// Créer un élément pour l'image
bestMovieImg = document.createElement('img')
bestMovieImg.src = result['image_url']
bestMovieImg.alt = 'Image de ' + result['title']
bestMovieDivChildren[1].appendChild(bestMovieImg)


})
.catch(function(err) {
// Une erreur est survenue
});

// Pour chaque catégorie à partir du nom de la catégorie 
// Récupérer les 7 meilleurs films et charger les images dans le carousel
// Création d'une fonction qui va être appelé avec le nom de la catégorie
async function getCategoryBestMovies2(category){
    // Récupérer les 5 premiers sur la page puis passer à la page suivante
    // Si le nombre de films change par page ?
    // Récupérer les films dispo tant que moins de 7 et passer à la page suivante
    const url = `http://127.0.0.1:8000/api/v1/titles/?genre=${category}&sort_by=-imdb_score`;
    const response = await fetch(url);
    const films = response.json();
    

}

// Pour chaque catégorie à partir du nom de la catégorie 
// Récupérer les 7 meilleurs films et charger les images dans le carousel
// Création d'une fonction qui va être appelé avec le nom de la catégorie
async function getCategoryBestMovies(id, category, numberOfMovies){
    // Récupérer les 5 premiers sur la page puis passer à la page suivante
    // Si le nombre de films change par page ?
    // Récupérer les films dispo tant que moins de 7 et passer à la page suivante
    let urls = [];
    let url = `http://127.0.0.1:8000/api/v1/titles/?genre=${category}&sort_by=-imdb_score`;
    fetch(url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        // Récupérer les 7 films
        //console.log(value)
        let results = value['results'];
        let i = 0;
        while (numberOfMovies>0 && i < results.length){
            urls.push(results[i]['image_url']);
            i++;
            numberOfMovies--;
        }
        url = value['next'];
    })
    .catch(function(err) {
    // Une erreur est survenue
    });
    
    fetch(url)
    .then(function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then(function(value) {
        // Récupérer les 7 films
        //console.log(value)
        let results = value['results'];
        let i = 0;
        while (numberOfMovies>0 && i < results.length){
            urls.push(results[i]['image_url']);
            i++;
            numberOfMovies--;
        }
    })
    .catch(function(err) {
    // Une erreur est survenue
    });

    //Récupérer la div de la catégorie
    console.log(urls);
    console.log(id);
    console.log(document);
    let categoryCarouselDiv = document.getElementById("best-movies");
    console.log(categoryCarouselDiv);
    let categoryCarouselInnerDiv = categoryCarouselDiv.getElementsByClassName("carousel-inner")[0];
    let activeItem = document.createElement("div");
    categoryCarouselInnerDiv.appendChild(activeItem);
    let activeItemImage = activeItem.createElement("img", {src: urls[0]});    

}

const numberOfMoviesPerCategory = 7;
getCategoryBestMovies("category-animation", "animation", numberOfMoviesPerCategory);