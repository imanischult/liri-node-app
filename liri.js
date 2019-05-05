
// // Add code to read and set any environment variables with the necessary dependency packages
const dotenv = require("dotenv").config();
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");

// Add the code required to import the keys.js file and store it in a variable.
const keys = require("./keys.js");

// Store key value for API keys 

const spotify = new Spotify(keys.spotify)
const omdbID = process.env.OMDB


// Include the axios npm package (Don't forget to run "npm install axios" in this folder first! 

const command = process.argv[2];
const subject = process.argv.slice(3).join(" ");;


// ------------------------ LIRI Logic -------------------------- //

// The switch-case statement will direct which function gets run.
const liriapp = function(command, data) {
switch (command) {
    case "movie-this":
      movieThis(data);
      break;
    
    case "spotify-this":
      spotifyThis(data);
      break;
    
    case "concert-this":
      concertThis(data);
      break;
    
    case "do-what-it-says":
      doWhatItSays();
      break;
    }
}

// ------------------------  MOVIE-THIS FUNCTION ------------------------- //

// Then run a request with axios to the OMDB API with the movie specified
const movieThis = function(movieData) {
    
    axios
        .get(`http://www.omdbapi.com/?t=${movieData}=&plot=short&apikey=${omdbID}`)
        .then(
            function(response) {

                const title = response.data.Title;
                const year = response.data.Year;
                const imdbRating = response.data.imdbRating;
                const rottenTomRating = response.data.Ratings[1].Value;
                const countryProduced = response.data.Country;
                const language = response.data.Language;
                const plot = response.data.Plot;
                const actors = response.data.Actors;

                console.log(`========================*\n\nTitle: ${title} \nYear: ${year} \nIMDB Rating: ${imdbRating} \nRotten Tomato Rating: ${rottenTomRating} \nCountry Where Movie Was Produced: ${countryProduced} \nMovie Language: ${language} \nPlot: ${plot} \nMain Actors: ${actors} \n\n========================*\n`);

        }
    )
};


// ------------------------  SPOTIFY-THIS FUNCTION ------------------------- //

const spotifyThis = function(concertData) {
    axios
        .get(`https://rest.bandsintown.com/artists/${concertData}/events?app_id=codingbootcamp`)
        .then(
            console.log(response)
        )
}
// ------------------------  CONCERT-THIS FUNCTION ------------------------- //

const concertThis = function(artistData) {
    axios
        .get(`https://rest.bandsintown.com/artists/${artistData}/events?app_id=codingbootcamp`)
        .then(
            function(response) {

                const artistResponse = response.data

                for (let i = 0; i < artistResponse.length; i++) {
                    let info = artistResponse[i];
                    
                const venue = info.venue.name
                const location = `${info.venue.city}, ${info.venue.region}`
                const eventDate = moment(info.datetime).format('L')

                console.log(`${venue} \n${location} \n${eventDate}`)
            }
                
        }
    )
}
// ------------------------  DO-WHAT-IT-SAYS FUNCTION ------------------------- //

const doWhatItSays = function(concertData) {
    axios
        .get(`https://rest.bandsintown.com/artists/${concertData}/events?app_id=codingbootcamp`)
        .then(
            console.log(response)
        )
}

// ------------------------ APP LOGIC ------------------------- //

const execute = function (action, subString) {
    liriapp(action, subString);
}


// ------------------------ Execute game function ------------------------- //

execute(command, subject);


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'



// ******************* What Each Command Should Do ******************* //
// node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


// Name of the venue


// Venue location


// Date of the Event (use moment to format this as "MM/DD/YYYY")


