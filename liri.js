//Set config
require('dotenv').config();

//Require needed modules
var moment = require('moment');
var axios = require('axios');
var fs = require('fs');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//Setup variables for command and search arguments
var command = process.argv[2];
var nodeArgs = process.argv;


//Function 
function doCommand(command,nodeArgs){

    //Determine what command was given and execute the appropriate function
    switch (command) {
        case 'movie-this':
            movie(nodeArgs);
            break;
        case 'spotify-this-song':
            spot(nodeArgs);
            break;
        case 'concert-this':
            concert(nodeArgs);
            break;
        case 'do-what-it-says':
            doWhat();
            break;
        default:
            console.log("Sorry, no valid LIRI command found!");
    }   
}


//Function to handle spotify-this command
function spot(nodeArgs) {
    
    var query = '';
    
    // Loop through all the words in the node argument if array
    // And handle the inclusion of "+"s
    if (typeof(nodeArgs) !== 'string'){

        for (var i = 3; i < nodeArgs.length; i++) {
            if (i >=3 && i < nodeArgs.length-1) {
                query = query + nodeArgs[i] + " ";
            }
            else {
                query = query + nodeArgs[i];    
            }
        }
    } else {

        //nodeArgs is a string from random.txt file
        if (nodeArgs.length > 0) {
            query = nodeArgs;
        }
    }

     //If search is still blank, then assign a default song title
     if (query === ''){
        query = 'The Sign';
    }

    spotify.search({ type: 'track', query: query, limit:10 }, function(err, res) {
        if (err) {
          return console.log('Error occurred: ' + err);

        } else {
            for (i=0;i<res.tracks.items.length;i++) {

                //If query term is included in the item name field, then found song
                //Console log out 
                if (res.tracks.items[i].name.includes(query)) {
                    console.log('\nArtists: ',res.tracks.items[i].album.artists[0].name);
                    console.log('Song: ',res.tracks.items[i].name);
                    console.log('Preview: ',res.tracks.items[i].preview_url);
                    console.log('Album: ',res.tracks.items[i].album.name);
                    console.log('-------------------------------');
                    
                } 
            }             
        }               
    })
}


//Function to handle 'movie-this' command
function movie(nodeArgs) {
    
    var search = '';

    // Loop through all the words in the node argument if array
    // And do a little for-loop magic to handle the inclusion of "+"s
    if (typeof(nodeArgs) !== 'string'){

        for (var i = 3; i < nodeArgs.length; i++) {
            if (i >=3 && i < nodeArgs.length-1) {
                search = search + nodeArgs[i] + " ";
            }
            else {
                search = search + nodeArgs[i];   
            }
        }
    } else {

        //nodeArgs is a string from random.txt file
        if (nodeArgs.length > 0) {
            search = nodeArgs;

        }
    }
        
    //If search is still blank, then assign a default movie title
    if (search === ''){
        search = 'Mr+Nobody';
    }

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
    function(res) {
      console.log("\nMovie Title: " + res.data.Title);
      console.log("Year: " + res.data.Year);
      console.log("IMDB Rating: " + res.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + res.data.Ratings[1].Value);
      console.log("Country: " + res.data.Country);
      console.log("Language: " + res.data.Language);
      console.log("Plot: " + res.data.Plot);
      console.log("Actors: " + res.data. Actors);
    //   console.log(res);
    }
  );
}
  

//Function to handle 'concert-this' command
function concert(nodeArgs) {

    var search = '';

    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    if (typeof(nodeArgs) !== 'string'){
    
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i >=3 && i < nodeArgs.length-1) {
                search = search +  nodeArgs[i] + ' ';
            }
            else {
                search = search + nodeArgs[i];
        
            }
        }

    } else {
        // nodeArgs is a string
        search  = nodeArgs;
    }


    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(
    function(res) {
        for (i=0;i<res.data.length;i++) {
            let eventDate = moment(res.data[i].datetime).format('L');
            console.log('\nArtist/Band: '+search.replace('+',' '));
            console.log('Venue: '+res.data[i].venue.name);
            console.log('Venue Location: '+res.data[i].venue.city + ', ' + res.data[i].venue.region);
            console.log('Date: '+eventDate);
            console.log('------------')
        }
        // console.log(res.data[0]);
    }  
    );
}   


//Function to do command specified in random.txt
function doWhat(){

    //Open and read random.txt for the command to execute
    fs.readFile("random.txt", "utf8", function(err, data) {
        
        if (err) {
          return console.log(err);

        } else {

            // Break the string down by comma separation and store the contents into the output array.
            var output  = data.split(",");

            //Assign values to command and node arguments
            var command = output[0];
            var nodeArgs = output[1];
            nodeArgs = nodeArgs.replace('"','');
            nodeArgs = nodeArgs.replace('"','');

            //Call do command function
            doCommand(command,nodeArgs);

        }     
      });
}


//Call do command function
doCommand(command,nodeArgs);



