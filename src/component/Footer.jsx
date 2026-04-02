import React, { useEffect, useRef, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faPlay,
  faForwardStep,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector, shallowEqual } from "react-redux";
import { faVolumeMute, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const API = import.meta.env.VITE_API_URL;
  const [songsrc, setSongsrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1); // for mute toggle

const {song} = useSelector(state => state.songTitle);

  const audioRef = useRef(null);
  const prevSongRef = useRef("");
  const songRef = useRef(song);

  useEffect(() => {
    songRef.current = song;
  }, [song]);

  // ✅ Just READ from Redux — no dispatch, no loop
  // MusicList already populated this state
  const songs = useSelector((state) => state.songsApi.songs, shallowEqual);

  // ✅ Find current song's metadata from the already-loaded Redux list
  const currentSongData = songs?.songs?.find((s) => s.title === song);
  const currentTitle = currentSongData?.title || "";
  const currentPoster = currentSongData?.poster || "";
  const currentArtist = currentSongData?.artist || "";

  // ✅ Stable fetch — reads song via ref
  const songFetch = useCallback(async () => {
    try {
      const res = await axios.post(
        `${API}song`,
        { title: songRef.current },
        { withCredentials: true }
      );
      setSongsrc(res.data.data.song);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume;
  }
}, [volume]);

  // ✅ Only fetch when song prop genuinely changes
  useEffect(() => {
    if (song && song !== prevSongRef.current) {
      prevSongRef.current = song;
      songFetch();
    }
  }, [song, songFetch]);

  // Progress + time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(audio.currentTime);
    };

    const setMeta = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, [songsrc]);

  // Auto-play when src changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !songsrc) return;

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.log("Autoplay error:", err));
  }, [songsrc]);

  function handlePlayPause() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(console.log);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    const value = e.target.value;
    if (audio && audio.duration) {
      audio.currentTime = (value / 100) * audio.duration;
    }
    setProgress(value);
  }

  function formatTime(time) {
    if (!time) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  }

  function handleVolumeChange(e) {
  const val = parseFloat(e.target.value);
  setVolume(val);
  if (audioRef.current) audioRef.current.volume = val;
}
function handleMute() {
  if (volume !== 0) {
    setPrevVolume(volume);       // save current before muting
    setVolume(0);
    if (audioRef.current) audioRef.current.volume = 0;
  } else {
    setVolume(prevVolume);       // restore previous volume
    if (audioRef.current) audioRef.current.volume = prevVolume;
  }
}
  return (
  <div className="footer">
    <audio ref={audioRef} src={songsrc} preload="auto" />

    {/* Left — song info */}
    <div className="footer-song-info">
      {currentPoster && <img src={currentPoster} alt="poster" />}
      <div className="footer-song-text">
        <strong>{currentTitle}</strong>
        <span>{currentArtist}</span>
      </div>
    </div>

    {/* Center — controls + seekbar */}
    <div className="footer-center">
      <div className="button">
        <FontAwesomeIcon className="backbutton" icon={faBackwardStep} size="xl" style={{ color: "rgb(63,63,63)" }} />
        <div className="pauseButton" onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="xl" style={{ color: "rgb(63,63,63)" }} />
        </div>
        <FontAwesomeIcon className="forwardbutton" icon={faForwardStep} size="xl" style={{ color: "rgb(63,63,63)" }} />
      </div>
      <div className="song-range">
        <h4 className="time">{formatTime(currentTime)}</h4>
        <input className="display-range" type="range" min="0" max="100" value={progress} onChange={handleSeek} />
        <h4 className="time">{formatTime(duration)}</h4>
      </div>
    </div>

    {/* ✅ Right — volume */}
    <div className="volume-control">
      <FontAwesomeIcon
        icon={volume === 0 ? faVolumeMute : faVolumeHigh}
        style={{ color: "rgb(63,63,63)", cursor: "pointer" }}
        onClick={handleMute}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>

  </div>
);
};

export default Footer;