# LIRI Bot

## LIRI Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line Node app that takes in four commands and gives you back related data.

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies.
   
## LIRI User Guide

To use LIRI you must complete the following setup steps:

    * Clone or download the Github repository https://github.com/alakoff/liri-node-app
    * Create your own client ID and client Secret for the Spotify API
    * Open and use a terminal window
    * Ensure that you are currently located in the directory "liri-node-app"
    * Create a ".env" file and place your keys inside of that file, following this format:

        SPOTIFY_ID=your-spotify-id
        SPOTIFY_SECRET=your-spotify-secret

    * Issue LIRI a valid command from the command prompt on your local machine
  

Issue LIRI a command, from a terminal prompt, following this format:

    $node liri [command] [argument]

Valid LIRI commands are one of the following commands:

   * concert-this
   * spotify-this-song
   * movie-this
   * do-what-it-says

## What Each Command Does

### 1. concert-this

    * node liri.js concert-this [artist or band]

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

    * Artist/Band
    * Name of the venue
    * Venue location
    * Date of the Event 

Example command and results:

![LIRI concert-this example](./images/concert-this.PNG)


### 2. spotify-this-song

    * node liri.js spotify-this-song [song name]

This will search the Spotify API for the song and return the following information about the song to the terminal:

     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

If no song is provided then LIRI will search Spotify for "The Sign" by Ace of Base.

Example command and results specifying a song

![LIRI spotify-this-song command example](./images/spotify.PNG)

Example command and results using defualt song

![LIRI spotify-this-song command example no song](./images/spotifydefault.PNG)


### 3. movie-this

    * node liri.js movie-this [movie-name]

This will search the OMDB API for the movie and return the following information about the movie to the terminal:

    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie

If the user doesn't specify a movie, LIRI will search for the movie 'Mr. Nobody.' by default.

Example command and results specifying a movie

![LIRI movie-this command example](./images/movie.PNG)

Example command and results using default movie

![LIRI movie-this command example no movie](./images/moviedefault.PNG)


### 4. do-what-it-says

   * node liri.js do-what-it-says

LIRI will take the text inside of the random.txt file and then use it to call the specified command inside the file.

  * It will run spotify-this-song for "I Want it That Way" by default.

Example command and results

![LIRI do-what-it-says example and results](./images/dowhat.PNG)

Example text in random.txt file

![random.txt file contents](./images/randomtxt.PNG)




