import React, { useState, useEffect } from "react";
import Artist from "./Artist";
import Tracks from "./Tracks";
import Search from "./Search";
const App = () => {
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

  const searchArtist = input => {
    fetch(`${API_ADDRESS}/artist/${input}`)
      .then(response => response.json())
      .then(data => {
        if (data.artists.total > 0) {
          const foundArtist = data.artists.items[0];
          setArtist(foundArtist);
          searchArtistTopAlbums(foundArtist.id);
        }
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    searchArtist("Daft Punk");
  }, []);

  const searchArtistTopAlbums = id => {
    fetch(`${API_ADDRESS}/artist/${id}/top-tracks`)
      .then(response => response.json())
      .then(data => {
        const topTracks = data.tracks;
        setTopTracks(topTracks);
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Music Master</h2>
      <Search searchArtist={searchArtist} />
      <Artist artist={artist} />
      <Tracks tracks={topTracks} />
    </div>
  );
};

export default App;
