require("dotenv").config();
var keys = require("./key.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// variables regarding inputs:

var command = process.argv[2];
var data = process.argv[3];


// switchboard of commands:
switch (command) {
    case "my-tweets":
        runTwitter();
        break;
    case "spotify-this-song":
        runSpotify(data);
        break;
    case "movie-this":
        runMovie(data);
        break;
    case "do-what-it-says":
        runDoWhatItSays();
        break;
    default:
        console.log("Liri did not understand your command, try using one of the following:");
        console.log("--------------------------------");
        console.log(`my-tweets`);
        console.log(`spotify-this-song "song title"`);
        console.log(`movie-this "Your movie"`);
        console.log(`do-what-it-says`);
        console.log("------------------------------");
};

// functions:

// twitter
// displays 20 of the most recent tweets by specified user
function runTwitter() {
    console.log("twitter");

}


// spotify
//  include a default song - (ACE OF BASE)
function runSpotify(songTitle) {
    console.log("spotify" + songTitle);

}


// movie this
// include default movie -  (MR Nobody)
function runMovie(movieTitle) {
    console.log("movie data" + movieTitle);

}

// do-what-it-says
// reads the random.txt file and follows the directions.
function runDoWhatItSays() {
    consoloe.log("doing it")

}