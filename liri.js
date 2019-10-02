// // Add code to read and set any environment variables with the necessary dependency packages

const dotenv = require("dotenv").config();
// This allows us to use the .env file for required spotify information
const axios = require("axios");
// This allows us to use axios to make calls to an API
const moment = require("moment");
// This allows us to change the date formatting (moment has other features as well)
const Spotify = require("node-spotify-api");
// This allows us to use the node spotify api
const fs = require("fs");
// This allows us to read from/write to other files

// Add the code required to import the keys.js file and store it in a variable.
const keys = require("./keys.js");

// Store key value for API keys
const spotify = new Spotify(keys.spotify);
// This pulls from the "keys.js" file where there is an object called Spotify.
const omdbID = process.env.OMDB;

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!

// We'll need this information to execute the switch case (below). The command to execute is on line 166
const command = process.argv[2]; // Pulls the command that the user types in terminal
const subject = process.argv.slice(3).join(" "); // Pulls anything after the command and joins them

// ------------------------ LIRI Logic -------------------------- //

// The switch-case statement will direct which function is ran based on the command
const liriapp = function(theCommand, data) {
  // This function takes in 2 parameters: a command and data. The command comes from the user's command, and data comes from what the user enters after their command //

  switch (
    theCommand // The switch happens depending on the command given
  ) {
    case "movie-this": // If the user writes "move-this",
      movieThis(data); // Run the movieThis function, and so on for the below
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
};

// ------------------------  MOVIE-THIS FUNCTION ------------------------- //

// Then run a request with axios to the OMDB API with the movie specified
const movieThis = function(movieData) {
  axios
    .get(`http://www.omdbapi.com/?t=${movieData}=&plot=short&apikey=${omdbID}`)
    .then(function(response) {
      const title = response.data.Title;
      const year = response.data.Year;
      const imdbRating = response.data.imdbRating;
      const rottenTomRating = response.data.Ratings[1].Value;
      const countryProduced = response.data.Country;
      const language = response.data.Language;
      const plot = response.data.Plot;
      const actors = response.data.Actors;

      console.log(
        `========================\n\nTitle: ${title} \nYear: ${year} \nIMDB Rating: ${imdbRating} \nRotten Tomato Rating: ${rottenTomRating} \nCountry Where Movie Was Produced: ${countryProduced} \nMovie Language: ${language} \nPlot: ${plot} \nMain Actors: ${actors} \n\n========================\n`
      );
    });
};

// ------------------------  SPOTIFY-THIS FUNCTION ------------------------- //

const spotifyThis = function(songData) {
  // This requires that we pull data from the spotify package that we installed earlier

  spotify.search({ type: "track", query: songData }, function(err, songData) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    const songResponse = songData.tracks.items;

    // The response returns an object within an object, so we have to use an object contructor to grab the info we want

    for (let i = 0; i < songResponse.length; i++) {
      let songInfo = songResponse[i];

      let artistName = songResponse[i].artists[0].name;
      let songName = songResponse[i].name;
      let spotifyLink = songResponse[i].external_urls.spotify;
      let albumName = songResponse[i].album.name;

      console.log(
        `========================\n\nArtist(s): ${artistName} \nName of Song: ${songName} \nSpotify Link: ${spotifyLink} \nAlbum Name: ${albumName}\n\n========================\n`
      );
    }
  });
};

// ------------------------  CONCERT-THIS FUNCTION ------------------------- //

const concertThis = function(artistData) {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${artistData}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      const artistResponse = response.data;

      for (let i = 0; i < artistResponse.length; i++) {
        let info = artistResponse[i];

        const venue = info.venue.name;
        const location = `${info.venue.city}, ${info.venue.region}`;
        const eventDate = moment(info.datetime).format("L");

        console.log(
          `========================\n\nVenue: ${venue} \nConcert Location: ${location} \nEvent Date: ${eventDate}\n\n========================\n`
        );
      }
    });
};
// ------------------------  DO-WHAT-IT-SAYS FUNCTION ------------------------- //

const doWhatItSays = function(command) {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    //Split the data by commas (to make it more readable)
    let spotArr = data.split(",");

    // It's helpful to console.log(spotArr) to make sure it reads the random text

    let song = spotArr[1];

    spotify.search({ type: "track", query: song }, function(err, commandResp) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      const songRand = commandResp.tracks.items;

      // The response returns an object within an object, so we have to use an object contructor (for loop) to grab the info we want

      for (let i = 0; i < songRand.length; i++) {
        let song = songRand[i];

        let artistName = song.artists[0].name;
        let songName = song.name;
        let spotifyLink = song.external_urls.spotify;
        let albumName = song.album.name;

        console.log(
          `========================\n\nArtist(s): ${artistName} \nName of Song: ${songName} \nSpotify Link: ${spotifyLink} \nAlbum Name: ${albumName}\n\n========================\n`
        );
      }
    });
  });
};

// ------------------------ Execute game function ------------------------- //

liriapp(command, subject);
