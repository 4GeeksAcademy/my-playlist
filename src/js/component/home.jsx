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

  useEffect(()=>{
    SongList()
  },[]
  );

  const playSongs = (url) => {
	ActualSong.current.src = `https://playground.4geeks.com${url}`;   
	ActualSong.current.play();
    setIsPlaying(true);
	console.log(url);
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

  const NextSong = () => {
	setCurrentSong((currentSong) => (currentSong + 1) % songs.length);
	SongList(songs[currentSong].url);
  };

  const PreviousSong = () => {
	setCurrentSong((currentSong) => (currentSong - 1 + songs.length) % songs.length);
	 SongList(songs[currentSong].url);
  };
  
  return (
    <div className="container" >
      <h1>Songs List:</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id} onClick={() => playSongs(song.url)}>{song.name}</li>
        ))}
      </ul>
      <audio src= "" ref={ActualSong}></audio>
	  
	  <button onClick={PreviousSong}>
		{/* poner el iconito de fontawesome */}
	  </button>

      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

	  <button onClick={NextSong}>
		{/* poner el iconito de fontawesome */}
	  </button>

    </div>
  );
};

export default Home;
