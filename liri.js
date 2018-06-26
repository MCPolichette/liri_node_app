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
        runSpotify(fullInput());
        break;
    case "movie-this":
        runMovie(fullInput());
        break;
    case "do-what-it-says":
        runDoWhatItSays();
        break;
    default:
        console.log("\nLiri did not understand your command, try using one of the following:");
        console.log("\n--------------------------------");
        console.log(`my-tweets`);
        console.log(`spotify-this-song "Song Title"`);
        console.log(`movie-this "Your movie"`);
        console.log(`do-what-it-says`);
        console.log("------------------------------");
};
// functions:
function fullInput() {
    var userInput = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        userInput = userInput + " " + process.argv[i];
    }
    return userInput;
}

// twitter
// displays 20 of the most recent tweets by specified user
function runTwitter() {
    var params = { screen_name: 'sltrib' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (element) {
                console.log("\n=================================\n" + element.created_at);
                console.log(element.text);
            });
        }
    });
}

// spotify
//  include a default song - (ACE OF BASE)
function runSpotify(songTitle) {
    //check for user input
    if (songTitle === null || typeof songTitle === 'undefined' || songTitle === undefined) {
        songTitle = "The+Sign";
    }

    console.log("spotify this " + songTitle);
    console.log("==========================");

    spotify.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (i = 0; i < data.tracks.items.length; i++) {
            console.log("---------------------------------------------")
            console.log(data.tracks.items[i].album.artists[0].name);
            console.log(data.tracks.items[i].album.name);
            console.log(data.tracks.items[i].external_urls.spotify);
        };
    });
};

// movie this
// include default movie -  (MR Nobody)
function runMovie(movieTitle) {
    console.log("*******************************************");

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating


            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

            console.log("Movie Title: " + JSON.parse(body).Title)
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Movie Rating: " + JSON.parse(body).Rated);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Where Movie Was Produced: " + JSON.parse(body).Country);
            console.log("Language Produced: " + JSON.parse(body).Language)
            console.log("Movie Plot: " + JSON.parse(body).Plot)
            console.log("List of Actors: " + JSON.parse(body).Actors)
        }
    });
    // Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.
};

// do-what-it-says
// reads the random.txt file and follows the directions.
function runDoWhatItSays() {
    console.log("doing it");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        };

        var randomChoice = data.split(",");
        console.log(randomChoice);
        if (randomChoice[0] === "spotify-this-song") {
            runSpotify(randomChoice[1]);
        };

    });
};