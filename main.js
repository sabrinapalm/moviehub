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


add.addEventListener('click', function(event){
    addMovie();
})

    


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

















































});