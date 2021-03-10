require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("./../models/user.model");
const spotifyApiConfig = require("../configs/spotify-config");
const { spotifyApi } = spotifyApiConfig;

spotifyApiConfig.connect();

// GET AN ARTIST
router.get("/artist/:artistId", (req, res, next) => {
  const { artistId } = req.params;

  spotifyApi
    .getArtist(artistId)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {});
});

// Main - input form - searchArtists
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

  spotifyApi
    .getArtist(userPref)
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => console.log("this is the catch", err));
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
  const userPref = req.body.userPref;
  
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

// Artist Page - send Artist's album
router.get("/artist/album/:id", (req, res, next) => {
  const { id } = req.params;
  spotifyApi.getArtistAlbums(id).then(
    function (data) {
      res.status(201).json(data);
    },
    function (err) {
      console.error(err);
    }
  );
});

// Artist Page - get top tracks
router.get("/artist/top-tracks/:id", (req, res, next) => {
  const { id } = req.params;
  spotifyApi.getArtistTopTracks(id, "ES").then(
    function (data) {
      res.status(201).json(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

// Album Page - get Tracks
router.get("/artist/album/track/:id", (req, res, next) => {
  const { id } = req.params;
  spotifyApi.getAlbumTracks(id).then(
    function (data) {
      res.status(201).json(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

// Album Page - get Album
router.get("/artist/one-album/:id", (req, res, next) => {
  const { id } = req.params;
  spotifyApi
    .getAlbum(id)
    .then((data) => {
      console.log(data);
      res.status(201).json(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
