require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require('./keys.js')
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

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
        console.log("\nLiri did not understand your command, try using one of the following:");
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
    console.log(client);
}


// spotify
//  include a default song - (ACE OF BASE)
function runSpotify(songTitle) {
    console.log("spotify" + songTitle);
    console.log(spotify);

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