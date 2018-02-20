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

let movie = document.getElementById('movie');


add.addEventListener('click', function(event){
    addMovie();
})

getMovies();

//GET MOVIE DATA
function getMovies() {
    ref.once('value', function(snapshot) {
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
    
    let fullMovie = {
        title: movieTitle,
        director: movieDirector,
        year: movieYear,
        img: movieImg
    }
    ref.push(fullMovie)
}
    

//CREATE MOVIE BOX
function createMovie(title, director, year, img) {
    let div = document.createElement('div');
    let image = document.createElement('img');
    image.src = img;
    let h4 = document.createElement('h4');
    let p = document.createElement('p');
    div.className = 'movies';
    
    image.innerHTML = `<img src="${img}">`;
    h4.innerText = `${title}`;
    p.innerText = `${director}, ${year}`;
    
    div.appendChild(image);
    div.appendChild(h4);
    div.appendChild(p);
    
    movie.appendChild(div);

}














































});