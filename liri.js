
// // Add code to read and set any environment variables with the necessary dependency packages
const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const spotify = require("node-spotify-api")

// Add the code required to import the keys.js file and store it in a variable.
const keys = require("./keys.js");

// Store key value for API keys 

const spotifyID = keys.SPOTIFY_ID
const spotifySecret = keys.SPOTIFY_SECRET
const omdbID = keys.OMDB 

// ----------------------- Global variables ----------------------------- //

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first! 

var command = process.argv[2];
var subject = process.argv.slice(3).join(" ");;


// ------------------------ LIRI Logic -------------------------- //

// The switch-case statement will direct which function gets run.
switch (action) {
    case "movie-this":
      movieThis();
      break;
    
    case "spotify-this":
      spotifyThis();
      break;
    
    case "concert-this":
      concertThis();
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }


// ------------------------  MOVIE-THIS COMMAND ------------------------- //

// Then run a request with axios to the OMDB API with the movie specified
var movieThis = function() {

    if (command === 'movie-this') {
    axios
        .get(`http://www.omdbapi.com/?t=${subject}=&plot=short&apikey=trilogy`)
        .then(
            function(response) {

                var title = response.data.Title;
                var year = response.data.Year;
                var imdbRating = response.data.imdbRating;
                var rottenTomRating = response.data.Ratings[1].Value;
                var countryProduced = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;

                console.log(`*******************\n\nTitle: ${title} \nYear: ${year} \nIMDB Rating: ${imdbRating} \nRotten Tomato Rating: ${rottenTomRating} \nCountry Where Movie Was Produced: ${countryProduced} \nMovie Language: ${language} \nPlot: ${plot} \nMain Actors: ${actors} \n\n*******************\n`);

            }
        )
    }
};

movieThis();

// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'




// **** Just checking that the above global variables are capturing the data. It works! **** //
// console.log(spotifyID);
// console.log(spotifySecret);


// Bands in Town: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" //
// OMDB: http://www.omdbapi.com/?apikey=[yourkey]&t=" + movieTitle +"
// Spotify: 



// ******************* What Each Command Should Do ******************* //
// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


// Name of the venue


// Venue location


// Date of the Event (use moment to format this as "MM/DD/YYYY")


