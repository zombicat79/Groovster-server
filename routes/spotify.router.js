require("dotenv").config();
const express = require("express");
const router = express.Router();
const SpotifyWebApi = require("spotify-web-api-node");
const User = require("./../models/user.model");

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// GET AN ARTIST
router.get("/:artistId", (req, res, next) => {
  const { artistId } = req.params;

  spotifyApi.getArtist(artistId)
  .then((data) => {
    res
    .status(201)
    .json(data)
  })
  .catch((err) => next(err));
})
 

// Main - input form
router.post("/main", (req, res, next) => {
  const { search } = req.body;
  spotifyApi
    .searchArtists(search)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

// Main - if no preferences set
router.post("/main/no-preferences", (req, res, next) => {
  spotifyApi
    .getArtistRelatedArtists("7jy3rLJdDQY21OgRLCZ9sD")
    .then(function (data) {
      console.log(data.body);
      res.status(201).json(data);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

// Main - if only one preference
router.post("/main/one-preference", (req, res, next) => {
  // const id = req.session.currentUser

  // User.findById(id)

  spotifyApi
    .getArtistRelatedArtists("7jy3rLJdDQY21OgRLCZ9sD")
    .then(function (data) {
      console.log(data.body);
      res.status(201).json(data);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

// Main - get user's preferences.
// router.get("/user", (req, res, next) => {
//   const id = req.session

//   console.log("thiiiiiiiis", id);
  

//   User.findById(id)
//     .then((data) => {
//         console.log(data);
        
//       res.status(201).json(data);
//     })
//     .catch((err) => console.log('this is where it fucks up', err));
// });

module.exports = router;
