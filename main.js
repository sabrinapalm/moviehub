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
let remove = document.getElementById('remove');
let one = document.getElementById('one');
let two = document.getElementById('two');

let movie = document.getElementById('movie');

window.addEventListener('load', function(event){
    getMovies();
})

add.addEventListener('click', function(event){
    addMovie();
    clearField();
})

sort.addEventListener('click', function(event){
    sortMovies();
})

remove.addEventListener('click', function(event){
    removeMovie();
})

one.addEventListener('click', function(event){
  getMovies()
})

two.addEventListener('click', function(event){
  pagination2();
})

//GET MOVIE DATA
function getMovies() {
    ref.limitToFirst(8).on('value', function(snapshot) {
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


function pagination2() {
  ref.limitToLast(8).on('value', function(snapshot) {
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

    if ( movieTitle || movieDirector || movieDirector || movieImg != "" ) {
        let fullMovie = {
        title: movieTitle,
        director: movieDirector,
        year: movieYear,
        img: movieImg
        }
        ref.push(fullMovie)
    } else {
        alert('All fields must be filled out!')
    }
}

function clearField() {
    title.value = '';
    director.value = '';
    year.value = '';
    img.value = '';
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
function sortMovies(title, director, year, img) {
    movie.innerHTML = '';
    var movieRef = database.ref().child('movies').orderByChild('title').limitToFirst(8);
    movieRef.on('value', function(snapshot){
        snapshot.forEach(function(item){
            let newOrder = JSON.stringify(item.val());
            let t = item.val().title;
            let d = item.val().director;
            let y = item.val().year;
            let i = item.val().img;

            createMovie(t, d, y, i);
        })
    })
}




//REMOVE MOVIES
function removeMovie() {
    ref.on('child_removed', function(snapshot){
        let data = snapshot.val();
        let key = snapshot.key;
    })
}







});
