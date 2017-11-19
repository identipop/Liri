var keys = require("./keys.js");
var inquirer = require('inquirer');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

//my-tweets last 20 tweets
//spotify-this-song <song> Artist, Song's name, preview of link from song in spotify, album song is from, no song? ace of base the sign (node-spotify-api)


//movie-this <movie> Title of movie, year it came out, imdb rating of movie, rotten tomatoes movie, country where produced, language of movie, plot of movie, actors in movie, output data for MR NOBODY as default
//do-what-it-says take fs and use random txt and call liri's commands, run spotify this song


inquirer
.prompt([
    { 
        type: "input",
        name: "username",
        message: "What is your name?"
    },

    {
        type: "list",
        name: "command",
        message: "What would you like me to search?",
        choices:[
            "Tweets", "A Song", "A Movie", "Liri's Choice"
        ]
    }


])
.then(function(userInput){

    console.log("Hi, " + userInput.username + "!  :D");
    console.log("");
    // fs.appendFile("log.txt", "Hi, " + userInput.username + "!");

  // We will then print the value that was added (but we wont print the total).


// TWITTER
    if (userInput.command === "Tweets"){
        
        var client = new Twitter(keys);
        console.log ("Tweets!");
        var params = {screen_name: 'randytheunicorn'};
        client.get('statuses/user_timeline', params, function(error, tweets, response){
            if (!error){
                for (var i = 0; i<tweets.length; i++){
                    
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("");
                    console.log(tweets[i].text);
                    console.log("");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        
                       
            }
        }
        });
        
    }


 //  SPOTIFY
    else if (userInput.command === "A Song"){
        
       
        inquirer
        .prompt([
            {
              type: "input",
              name: "spotifysearch",
              message: "What song would you like me to search? Feel free to add the artist for a more accurate result!"
            }
        ])
        .then(function(songtosearch){
            var songtitle = songtosearch.spotifysearch;

            if (songtitle === ""){
                songtitle = "Ace of Base The Sign";
            }
            var spotify = new Spotify({
                id: "0f593732b894412fad8dcaa0e2f50728",
                secret: "4bf8d5bb7c714d88b3e22f6a1d0ad112",
              });
               
              spotify.search({ type: 'track', query: songtitle, limit: 1}, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               var result = data.tracks.items[0];
               console.log("Oh hey, a song!");
               console.log("");
               console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
               console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
               console.log("");
                console.log("Song Title: " + result.name); 
                console.log("");
                console.log("Artist: " + result.artists[0].name);
                console.log("");
                console.log ("Link: " + result.preview_url);
                console.log("");
                console.log ("Album: " + result.album.name);
                console.log("");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        });
    });
}



 // OMDB
    
    else if (userInput.command === "A Movie"){
        
       
        inquirer
        .prompt([
            {
              type: "input",
              name: "omdbsearch",
              message: "What movie would you like me to search?"
            }
        ])
        .then(function(movietosearch){
            var movietitle = movietosearch.omdbsearch;

            if (movietitle === ""){
                movietitle = "Mr. Nobody";
            }

            var queryUrl = "http://www.omdbapi.com/?t=" + movietitle + "&y=&plot=short&apikey=30a41241";

            request(queryUrl, function(error, response, body) {
                  if (!error && response.statusCode === 200) {
                
                    console.log("Oh look, a movie!");
                    console.log("");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("");
                    console.log("Title: " + JSON.parse(body).Title);
                    console.log("");
                    console.log("Released: "+ JSON.parse(body).Year);
                    console.log("");
                    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                    console.log("");
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
                    console.log("");
                    console.log("Countries: " + JSON.parse(body).Country);
                    console.log("");
                    console.log("Languages: " + JSON.parse(body).Language);
                    console.log("");
                    console.log("Plot: " + JSON.parse(body).Plot);
                    console.log("");
                    console.log("Actors: "+ JSON.parse(body).Actors);
                    console.log("");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                  }
        });
        //ask for movie
    });
}

// RANDOM
    else if (userInput.command === "Liri's Choice"){
        console.log("Liri's Choice");
        //use random.txt data to search spotify
        
        fs.readFile("random.txt", "utf8", function (err, data){
            if (err){
                return console.log(err);
            }

            var read = data.split(",");

            console.log(read[1]);

            var lirisong = read[1];
            
            var spotify = new Spotify({
                id: "0f593732b894412fad8dcaa0e2f50728",
                secret: "4bf8d5bb7c714d88b3e22f6a1d0ad112",
              });
               
              spotify.search({ type: 'track', query: lirisong, limit: 1}, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               var result = data.tracks.items[0];
             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
             console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
             console.log("");
              console.log("Song Title: " + result.name); 
              console.log("");
              console.log("Artist: " + result.artists[0].name);
              console.log("");
              console.log ("Link: " + result.preview_url);
              console.log("");
              console.log ("Album: " + result.album.name);
              console.log("");
              console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
              console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
              });
        });
    

    }

// ERROR
    else{
        console.log("error");
    }
});