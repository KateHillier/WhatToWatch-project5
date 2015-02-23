

var whatToWatchApp = {};

whatToWatchApp.key = "458228b68f28a7460b64833155f4e988";
 

whatToWatchApp.init = function(){
	// init is for starting my application
	whatToWatchApp.getGenres();
	$('.filterGenre').on('submit', function(e){
		e.preventDefault();
		$('html, body').animate({
		    scrollTop: $("#results").offset().top
		}, 1000);
		var genreValue = $('#genre').val();
		whatToWatchApp.getMoviesByGenreID(genreValue);
	});
	$('.filterActor').on('submit', function(e){
		e.preventDefault();
		$('html, body').animate({
		    scrollTop: $("#results").offset().top
		}, 1000);
		var actor = $('.actor').val();
		whatToWatchApp.getActor(actor);
	});
	$('.filterRating').on('submit', function(e){
		e.preventDefault();
		$('html, body').animate({
		    scrollTop: $("#results").offset().top
		}, 1000);
		whatToWatchApp.getRating();
	});
}



////////////// FILTER - by Genre ///////////////////

// GET Genres from API
whatToWatchApp.getGenres = function(){
	$.ajax({
		url : 'http://api.themoviedb.org/3/genre/movie/list',
		dataType : 'jsonp',
		type : 'GET',
		data : {
			api_key : whatToWatchApp.key,
		},
		success : function(resultGenre) {
			// console.log(resultGenre);
			whatToWatchApp.displayGenres(resultGenre);
		}
	});
} 

// INPUTS Genre ids & values into Select input
whatToWatchApp.displayGenres = function(resultGenre) {
	for (var i = 0; i < resultGenre.genres.length; i++) {
		var genreName = resultGenre.genres[i].name;
		var genreID = resultGenre.genres[i].id;
		var option = $('<option value>').attr('value', genreID).text(genreName);
		$('#genre').append(option);
	};
}

// TAKES submitted ID from select input to GET movie genres
whatToWatchApp.getMoviesByGenreID = function(id) {
	var url = 'http://api.themoviedb.org/3/genre/' + id + '/movies';
	$.ajax({
		url : url,
		dataType : 'jsonp',
		type : 'GET',
		data : {
			api_key : whatToWatchApp.key
		},
		success : function(result) {
			// console.log(result);
			whatToWatchApp.displayMoviesbyGenre(result);
		}
	});	
}

// DISPLAYS results of Genre search
whatToWatchApp.displayMoviesbyGenre = function (result) {
	$('#results').html('');
	// console.log("ready to display the pieces with the data", result);
	var genres = result.results;
	for (var i = 0; i < genres.length; i++) {
		console.log(genres[i]);
		var div = $('<div>').addClass('row');
		var p = $('<p>').addClass('title').text(genres[i].title);
		var img = $('<img>').addClass('hvr-grow').attr('src', 'http://image.tmdb.org/t/p/w500/' + genres[i].poster_path);
		div.append(img,p);
		$('#results').append(div);
	};
}



///////////////// FILTER - by Actor //////////////////////
// Gets actors from API
whatToWatchApp.getActor = function(actor) {
	$.ajax({
		url : 'http://api.themoviedb.org/3/search/person',
		dataType : 'jsonp',
		type : 'GET',
		data : {
			api_key : whatToWatchApp.key,
			query: encodeURIComponent(actor)
		},
		success : function (resultActor) {
			console.log(resultActor.results[0].known_for);
		whatToWatchApp.displayActor(resultActor);	
		}
	});
}

// DISPLAYS results of Actor search
whatToWatchApp.displayActor = function(resultActor) {
	$('#results').html('');

	var knownFor = resultActor.results[0].known_for;
	for (var i = 0; i < knownFor.length; i++) {
		console.log(knownFor[i].original_title);
		var div = $('<div>').addClass('row');
		var p = $('<p>').addClass('title').text(knownFor[i].title);
		var img = $('<img>').addClass('hvr-grow').attr('src', 'http://image.tmdb.org/t/p/w500/' + knownFor[i].poster_path);
		div.append(img,p);
		$('#results').append(div);

		console.log(resultActor);
	}
} // end displayActor


////////////// FILTER - by Top Rated /////////////////////////

whatToWatchApp.getRating = function() {
	$.ajax({
		url : 'http://api.themoviedb.org/3/movie/top_rated',
		dataType : 'jsonp',
		type : 'GET',
		data : {
			api_key : whatToWatchApp.key,
		},
		success : function(resultRating) {
			console.log(resultRating);
			whatToWatchApp.displayRating(resultRating);
		}	
	});	
}

whatToWatchApp.displayRating = function(resultRating) {
	$('#results').html('');

	var topRated = resultRating.results;
	for (var i = 0; i < topRated.length; i++) {
		console.log(topRated[i].original_title);
		var div = $('<div>').addClass('row');
		var p = $('<p>').addClass('title').text(topRated[i].title);
		var img = $('<img>').addClass('hvr-grow').attr('src', 'http://image.tmdb.org/t/p/w500/' + topRated[i].poster_path);
		div.append(img,p);
		$('#results').append(div);
	};
}


$(function() {
	whatToWatchApp.init();
});
