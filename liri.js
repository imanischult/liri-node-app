
// Add code to read and set any environment variables with the dotenv package
const dotenv = require("dotenv").config();
 

// **** This code checks to see if the above code is grabbing the info from the .env file **** //
// if (dotenv.error) {
//   throw dotenv.error
// }

// console.log(dotenv);


// Add the code required to import the keys.js file and store it in a variable.
const keys = require("./keys.js");

// Store key value for API keys 
const omdb = "47495b36"
const spotifyID = dotenv.parsed.SPOTIFY_ID
const spotifySecret = dotenv.parsed.SPOTIFY_SECRET
const 

// **** Just checking that the above global variables are capturing the data. It works! **** //
// console.log(spotifyID);
// console.log(spotifySecret);


// Bands in Town: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp" //
// OMDB: http://www.omdbapi.com/?apikey=[yourkey]&t=" + movieTitle +"


