document.addEventListener('DOMContentLoaded', function () {

//database var
const database = firebase.database();
let ref = database.ref('movies/');

//all var
let title = document.getElementById('title');
let director = document.getElementById('director');
let year = document.getElementById('year');
let img = document.getElementById('image');
let add = document.getElementById('add');
let sort = document.getElementById('sort');

let movie = document.getElementById('movie');


add.addEventListener('click', function(event){
    addMovie();
})
    
sort.addEventListener('click', function(event){
    sortMovies();
})

getMovies();

//GET MOVIE DATA
function getMovies() {
    ref.on('value', function(snapshot) {
        let movieData = snapshot.val();
        let keys = Object.keys(movieData);
        
        for (i = 0; i < keys.length; i++) {
            let x = keys[i];
            let movieT = movieData[x].title;
            let movieD = movieData[x].director;
            let movieY = movieData[x].year;
            let movieI = movieData[x].img;
            createMovie(movieT, movieD, movieY, movieI);
        }
    });
}
    


//FUNCTION FOR ADDING MOVIEDATA



function addMovie() {
    let movieTitle = title.value;
    let movieDirector = director.value;
    let movieYear = year.value;
    let movieImg = img.value;
    
    if (movieTitle || movieDirector || movieDirector || movieImg == "") {
        alert('Wrong!')
    } else {
        let fullMovie = {
        title: movieTitle,
        director: movieDirector,
        year: movieYear,
        img: movieImg
        }
        ref.push(fullMovie)
        
        clearField();
        
    }
}
    
function clearField() {
    
}    

//CREATE MOVIE BOX


function createMovie(title, director, year, img) {
    let div = document.createElement('div');
    let image = document.createElement('img');
    image.src = img;
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    let removeBtn = document.createElement('button')
    div.className = 'movies';
    
    image.innerHTML = `<img src="${img}">`;
    h4.innerText = `${title}`;
    p.innerText = `${director}, ${year}`;
    removeBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`;
    
    removeBtn.className = 'removemovie';
    
    div.appendChild(image);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(removeBtn);
    
    movie.appendChild(div);
}

//SORT MOVIES BY TITLE 

function sortMovies() {
    var movieRef = database.ref().child('movies').orderByChild('title');
    movieRef.once('value', function(snapshot){
        snapshot.forEach(function(item){
            
            let newOrder = JSON.stringify(item.val());
            console.log(newOrder);
            
        })
    })
}












































});