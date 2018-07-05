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
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');
let page3 = document.getElementById('page3');
let page4 = document.getElementById('page4');
let page5 = document.getElementById('page5');
let page6 = document.getElementById('page6');
let movie = document.getElementById('movie');
let pagination = document.getElementsByClassName('pagination')[0];


window.addEventListener('load', function(event){
    getMovies();
    listenToMovies();
})

add.addEventListener('click', function(event){
    addMovie();
    clearField();
})

sort.addEventListener('click', function(event){
    sortMovies();
})

page1.addEventListener('click', function(event){
    getMovies()
})


//GET MOVIE DATA
function getMovies() {
  movie.innerHTML = '';
  firebase.database().ref("/movies").once('value', function(snapshot) {
        let movieData = snapshot.val();
        if(!movieData) {
          console.log('no movies')
        } else {
          let movieList = Object.values(movieData);
          paginations(movieList);
        }
    });
}

function listenToMovies() {
  firebase.database().ref("/movies").on('child_added', (snapshot) => {
    let key = snapshot.key;
    updateLastChildWithKey(key);
    getMovies()
  });

  firebase.database().ref("/movies").on('child_removed', (snapshot) => {
    getMovies()
  });
}

function updateLastChildWithKey(key) {
  let id = key;
  firebase.database().ref(`/movies/${key}`).update({id: key});
}


function paginations(movieList) {
  let first = movieList.slice(0, 4),
      second = movieList.slice(4, 8),
      third = movieList.slice(8, 12),
      forth = movieList.slice(12, 16),
      fifth = movieList.slice(16, 20),
      sixth = movieList.slice(20, 24)

    if (first.length === 4 || first.length > 0) {
      page1.className = 'show';
      movie.innerHTML = '';
      first.map(function(movie) {
        let title = movie.title;
        let director = movie.director;
        let year = movie.year;
        let img = movie.img;
        let key = movie.id;
        createMovie(title, director, year, img, key);
      })
    }

    if (second.length === 4 || second.length > 0) {
      page2.className = 'show';
      page2.addEventListener('click', function(event){
        movie.innerHTML = '';
        second.map(function(movie) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          createMovie(title, director, year, img, key);
        })
      })
    } else {
      page2.className = 'hide';
    }

    if (third.length === 4 || third.length > 0) {
      page3.className = 'show';
      page3.addEventListener('click', function(event){
        movie.innerHTML = '';
        third.map(function(movie) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          createMovie(title, director, year, img, key);
        })
      })
    } else {
      page3.className = 'hide';
    }

    if (forth.length === 4 || forth.length > 0) {
      page4.className = 'show';
      page4.addEventListener('click', function(event){
        movie.innerHTML = '';
        forth.map(function(movie) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          createMovie(title, director, year, img, key);
        })
      })
    } else {
      page4.className = 'hide';
    }

    if (fifth.length === 4 || fifth.length > 0) {
      page5.className = 'show';
      page5.addEventListener('click', function(event){
        movie.innerHTML = '';
        fifth.map(function(movie) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          createMovie(title, director, year, img, key);
        })
      })
    } else {
      page5.className = 'hide';
    }

    if (sixth.length === 4 || sixth.length > 0) {
      page6.className = 'show';
      page6.addEventListener('click', function(event){
        movie.innerHTML = '';
        fifth.map(function(movie) {
          let title = movie.title;
          let director = movie.director;
          let year = movie.year;
          let img = movie.img;
          let key = movie.id;
          createMovie(title, director, year, img, key);
        })
      })
    } else {
      page6.className = 'hide';
    }

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
    removeBtn.innerHTML = `Remove`;
    removeBtn.setAttribute("id", key)

    removeBtn.className = 'removemovie';

    div.appendChild(image);
    div.appendChild(h4);
    div.appendChild(p);
    div.appendChild(removeBtn);

    movie.appendChild(div);
}

// Remove movie from database
document.addEventListener("click",function (event) {
    if(event.target.className == "removemovie"){
      var removeId = event.target.getAttribute("id");
      console.log(removeId);
      removeMovie(removeId);
    }
  })

removeMovie = (removeId) => {
  const database = firebase.database();
  database.ref(`/movies/${removeId}`).remove();
  let parent = event.target.parentNode;
  parent.parentNode.removeChild(parent);
}


//SORT MOVIES BY TITLE
function sortMovies(title, director, year, img) {
    movie.innerHTML = '';
    var movieRef = database.ref().child('movies').orderByChild('title');
    movieRef.once('value', function(snapshot){
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
        img: movieImg,
        id: ''
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
