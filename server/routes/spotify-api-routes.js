const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("../utilities/spotifyWebApi");
const { createPlaylist, getOldTracks } = require("../utilities/remixPlaylist");
const router = require("express").Router();
const User = require("../models/user-model");
const { Playlist, Song } = require("../models/playlist-model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get("/playlists", (req, res) => {
  setUpSpotifyApi(req.user.username)
    .then((spotifyApi) => {
      spotifyApi.getUserPlaylists(req.user.username).then(
        (data) => {
          res.status(200).json({
            success: true,
            playlists: data.body,
          });
        },
        (err) => {
          console.log("Error grabbing playlists", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/playlist", (req, res) => {
  setUpSpotifyApi(req.user.username)
    .then((spotifyApi) => {
      spotifyApi.getPlaylist(req.body.playlistId).then(
        (data) => {
          res.status(200).json({
            success: true,
            playlist: data.body,
          });
        },
        (err) => {
          console.log("Error grabbing playlist", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/remix", (req, res) => {
  // MAKE ASYNCHRONOUS?

  // Creates new playlist on spotify
  const newPlaylistId = createPlaylist(req.body.playlistName,req.user.username);
  // console.log(newPlaylistId);
  // Fetch song information
  const oldTracks = getOldTracks(req.body.playlistId, req.user.username).then((data) => {
    console.log(data);
    return data;
  }).then((rdata) => {
    console.log(rdata);
    return rdata;
  }).catch((err) => {console.log(err)});

  console.log(oldTracks);
  // Creates playlist model

  // Populate playlist
  // Populate playlist model
  // Returns model info (or spotifys?)
});
module.exports = router;
