import React, { useState } from "react";

const Tracks = ({ tracks }) => {
  const [playing, setPlaying] = useState(false);
  const [playingPreviewUrl, setPlayingPreviewUrl] = useState(false);
  const [audio, setAudio] = useState(null);

  const trackIcon = track => {
    if (!track.preview_url) {
      return <span>N/A</span>;
    }

    if (playing && playingPreviewUrl === track.preview_url) {
      return <span>| |</span>;
    }

    return <span>&#9654;</span>;
  };

  const playAudio = previewUrl => {
    const newAudio = new Audio(previewUrl);
    if (!playing) {
      setPlaying(true);
      setPlayingPreviewUrl(previewUrl);
      setAudio(newAudio);
      newAudio.play();
    } else {
      audio.pause();
      if (playingPreviewUrl == previewUrl) {
        setPlaying(false);
      } else {
        newAudio.play();
        setPlayingPreviewUrl(previewUrl);
        setAudio(newAudio);
      }
    }
  };

  return (
    <div>
      {tracks.map(track => {
        const { id, name, album, preview_url } = track;

        return (
          <div
            key={id}
            onClick={() => playAudio(preview_url)}
            className="track"
          >
            <img
              src={album.images[0] && album.images[0].url}
              alt="track-image"
              className="track-image"
            />
            <p className="track-text">{name}</p>
            <p className="track-icon">{trackIcon(track)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Tracks;
