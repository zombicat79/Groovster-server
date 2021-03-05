require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");

class SpotifyAPIConfig {
  // setting the spotify-api goes here:
  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });
  }

  connect = () => {
    this.spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        this.spotifyApi.setAccessToken(data.body["access_token"]);
        this.spotifyApi.setRefreshToken(data.body["refresh_token"]);
      })
      .catch((error) =>
        console.log(
          "Something went wrong when retrieving an access token",
          error
        )
      );
  };

  refreshToken = () => {
    this.spotifyApi.refreshAccessToken().then(
      function (data) {
        console.log("The access token has been refreshed!");

        // Save the access token so that it's used in future calls
        this.spotifyApi.setAccessToken(data.body["access_token"]);
      },
      function (err) {
        console.log("Could not refresh access token", err);
      }
    );
  };
}

const spotifyApiConfig = new SpotifyAPIConfig();

module.exports = spotifyApiConfig;
