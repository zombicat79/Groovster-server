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

// Main - input form - Search Artist
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

// Main - Get One Artist
router.post("/main/singleArtist", (req, res, next) => {
  const { userPref } = req.body;
  console.log(userPref);
  

  spotifyApi
    .getArtist(userPref)
    .then((data) => {
        console.log(data);
        res.status(201).json(data)
        
    })
    .catch((err) => console.log(err));
});

// Main - Get Related Artists (if no preferences set)
router.get("/main/no-preferences", (req, res, next) => {
  spotifyApi
    .getArtistRelatedArtists("7jy3rLJdDQY21OgRLCZ9sD")
    .then(function (data) {
      console.log(data.body);
      res.status(201).json(data.body);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

// Main - Get Related Artist (Based on user preference)
router.post("/main/one-preference", (req, res, next) => {
  const { userPref } = req.body;

  spotifyApi
    .getArtistRelatedArtists(userPref)
    .then(function (data) {
      console.log(data.body);
      res.status(201).json(data);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

// Main - Get Several Artists
router.post("/main/preferences", (req, res, next) => {
    console.log(req.body.artistsArr);
    
  const userPref = req.body.artistsArr;
  console.log("this?", userPref);

  spotifyApi
    .getArtists(userPref)
    .then(function (data) {
      console.log(data.body);
      res.status(201).json(data);
    })
    .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
    );
});

module.exports = router;
