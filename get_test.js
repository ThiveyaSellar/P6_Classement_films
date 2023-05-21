function update_carousel(){
    let movies_images = [...document.getElementsByClassName('carrousel')[0].children]
   
    movies_images.forEach((element, index)=>{
        if( index < 4){
            element.style.display = 'block'
        }else{
            element.style.display = 'none'
        }
    })
}

function leftArrow(section){
    let content = section.getElementsByClassName('carrousel')[0];
    content.append(content.children.item(0));
    // Récupérer les éléments du caroussel dans un tableau
    let caroussel = document.getElementsByClassName('carrousel')[0];
    let images = caroussel.getElementsByTagName('img');
    update_carousel()
}

function rightArrow(section){
    let content = section.getElementsByClassName('carrousel')[0];
    console.log(content.children.item(content.children.length-1))
    content.prepend(content.children.item(content.children.length - 1));
    // Récupérer les éléments du caroussel dans un tableau
    let caroussel = document.getElementsByClassName('carrousel')[0];
    let images = caroussel.getElementsByTagName('img');
    update_carousel()
}

// Récupérer l'id des boutons des caroussels cliqués uniquement
// Passer en paramètre des fonctions 
const carrouselSection = document.getElementById('best-movies');
const leftBtn = carrouselSection.getElementsByClassName('leftBtn')[0];
const rightBtn = carrouselSection.getElementsByClassName('rightBtn')[0];

leftBtn.addEventListener('click', function(){
	leftArrow(carrouselSection);
});

rightBtn.addEventListener('click', function(){
	rightArrow(carrouselSection);
})

