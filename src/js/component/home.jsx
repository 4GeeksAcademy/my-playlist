import { useEffect, useRef, useState } from 'react';
import React from "react";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const ActualSong = useRef();

  const SongList = () => {
    fetch('https://playground.4geeks.com/sound/songs')
      .then(response => response.json())
      .then(data => setSongs(data.songs))
      .catch(error => console.error('Error:', error));
  }

  useEffect(() => {
    SongList()
  }, []
  );

  const playSongs = (url) => {
    ActualSong.current.src = `https://playground.4geeks.com${url}`;
    ActualSong.current.load(); 
    ActualSong.current.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      ActualSong.current.pause();
      setIsPlaying(false);
    } else {
      ActualSong.current.play();
      setIsPlaying(true);
    }
  };

  const handleClick = (index) => {
    document.querySelectorAll('li').forEach((element) => element.classList.remove('active'));
    document.getElementById(`song-${index}`).classList.add('active');
    setCurrentSong(index);
    playSongs(songs[index].url);
  };

  const NextSong = () => {
    setCurrentSong((currentSong + 1) % songs.length);
    document.querySelectorAll('li').forEach((element) => element.classList.remove('active'));
    document.getElementById(`song-${currentSong}`).classList.add('active');
    playSongs(songs[currentSong].url);
  };

  const PreviousSong = () => {
    setCurrentSong((currentSong - 1 + songs.length) % songs.length);
    document.querySelectorAll('li').forEach((element) => element.classList.remove('active'));
    document.getElementById(`song-${currentSong}`).classList.add('active');
    playSongs(songs[currentSong].url);
  };

  return (
    <div className="container" >
      <h1>Songs List:</h1>
      <ul>
        {songs.map((song, index) => (
          <li key={song.id} id={`song-${index}`} onClick={() => handleClick(index)}>{song.name}</li>
        ))}
      </ul>
      <audio src="" ref={ActualSong}></audio>

      <button className="btn fa-solid fa-square-caret-left" onClick={PreviousSong}>

      </button>

      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button className="btn fa-solid fa-square-caret-right" onClick={NextSong}>

      </button>

    </div>
  );
};

export default Home;