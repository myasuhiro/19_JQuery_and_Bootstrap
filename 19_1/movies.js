let currentID = 0;

let moviesList = [];

$(function() {
  // Adding my new favorite movie to the list

  $("#new-movie-form").on("submit", function(e) {
    e.preventDefault();
    const title = $("#title").val();
    const rating = $("#rating").val();

    let movieData = { title, rating, currentID };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentID++
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  })

  // When the delete button is clicked, remove the movies
  $("tbody").on("click", ".btn.btn-danger", function(e) {
    const indexToRemoveAt = moviesList.findIndex(movie => movie.currentID === $(e.target).data("deleteID"))
  
    moviesList.splice(indexToRemoveAt, 1)

    $(e.target).closest("tr").remove();

  })

  $(".fas").on("click", function(e){
    let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(e.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    $("#movie-table-body").empty();

    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend)
    }

    $(e.target).toggleClass("fa-sort-down");
    $(e.target).toggleClass("fa-sort-up");
  })


});

function sortBy(array, keyToSortBy, direction) {
  return array.sort(function(a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}


// createMovieDataHTML accepts an object with title and rating keys and returns HTML
function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    </tr>
  `
}