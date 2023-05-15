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


async function getCategoryBestMovies2(id, url, numberOfMovies){
    // Si le nombre de films change par page ?
    let urls = [];
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

    const categoryCarouselDiv = document.getElementById(id);
    const carouselElement = categoryCarouselDiv.getElementsByClassName("carousel-inner")[0];

    for (let i=0; i < bestMovies.length; i++){
        let elementDiv = document.createElement('div');
        if (i==0){
            elementDiv.classList.add("carousel-item", "active");     
        } else {
            elementDiv.classList.add("carousel-item"); 
        }
        let elementImg = document.createElement('img');
        elementImg.src = bestMovies[i].image_url;
        elementImg.alt = bestMovies[i].title;
        elementImg.setAttribute("id",bestMovies[i].id)
        elementDiv.appendChild(elementImg);
        carouselElement.appendChild(elementDiv);
    }

}

