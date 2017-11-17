var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
//my-tweets last 20 tweets
//spotify-this-song <song> Artist, Song's name, preview of link from song in spotify, album song is from, no song? ace of base the sign (node-spotify-api)
// Client ID
// 0f593732b894412fad8dcaa0e2f50728
// Client Secret
// 4bf8d5bb7c714d88b3e22f6a1d0ad112

//movie-this <movie> Title of movie, year it came out, imdb rating of movie, rotten tomatoes movie, country where produced, language of movie, plot of movie, actors in movie, output data for MR NOBODY as default
//do-what-it-says take fs and use random txt and call liri's commands, run spotify this song