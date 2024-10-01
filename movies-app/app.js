document.addEventListener("DOMContentLoaded", function() {
    let movies = [];
  
    // Function to add a movie to the list
    $('#movie-form').on('submit', function(e) {
      e.preventDefault();
  
      const title = $('#title').val();
      const rating = $('#rating').val();
      
    // debugging code 
    //   console.log("Title:", title);
    //   console.log("Rating:", rating);
  
      // Validation for the title and rating
      if (title.length < 2) {
       alert ("Title must have at least 2 characters.");
        return;
      }
      if (rating < 0 || rating > 10) {
        alert("Rating must be between 0 and 10.");
        return;
      }
  
      const movie = { title, rating };
      movies.push(movie);
      appendMovieToDOM(movie);
  
      // Clear form inputs
      $('#title').val('');
      $('#rating').val('');
    });
  
    // Function to append movie to the DOM
    function appendMovieToDOM(movie) {
      const $movieItem = $(`<li>${movie.title} - Rating: ${movie.rating} <button class="remove-btn">Remove</button></li>`);
      $('#movie-list').append($movieItem);
  
      // Remove movie event
      $movieItem.find('.remove-btn').on('click', function() {
        $movieItem.remove();
        movies = movies.filter(m => m.title !== movie.title || m.rating !== movie.rating);
      });
    }
  
    // Sorting by title
    $('#sort-title').on('click', function() {
      movies.sort((a, b) => a.title.localeCompare(b.title));
      renderMovies();
    });
  
    // Sorting by rating
    $('#sort-rating').on('click', function() {
      movies.sort((a, b) => a.rating - b.rating);
      renderMovies();
    });
  
    // Function to render sorted movies
    function renderMovies() {
      $('#movie-list').empty();
      for (const movie of movies) {
        appendMovieToDOM(movie);
      }
    }
  });
  