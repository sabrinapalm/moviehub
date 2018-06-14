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
    ref.on('value', function(snapshot) {
        let movieData = snapshot.val();
        let movieList = Object.values(movieData);

        movieList.map(function(movie, index) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          console.log()
          createMovie(title, director, year, img, key);
        });

    });
}


//CREATE MOVIE BOX
function createMovie(title, director, year, img, key) {
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
    removeBtn.setAttribute("id", key)

    removeBtn.className = 'removemovie';

    div.appendChild(image);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(removeBtn);

    movie.appendChild(div);
}

//Remove movie from database
document.addEventListener("click",function (event) {
    if(event.target.className == "removemovie"){
      var removeId = event.target.getAttribute("id");
      removeMovie(removeId);
    }
  })

removeMovie = (removeId) => {
  console.log(removeId);
  const database = firebase.database();
  database.ref(`/movies/${removeId}`).remove();
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


});
