import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';

export const useAudio = () => {
  const audioRef = useRef(new Audio());
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    setProgress,
    setDuration,
    nextTrack,
  } = usePlayerStore();

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (!currentTrack) {
      audioRef.current.pause();
      audioRef.current.src = '';
      return;
    }
    audioRef.current.src = currentTrack.url;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn('Play error:', e));
    }
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.warn('Play error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      setProgress(audio.currentTime / audio.duration);
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const onEnded = () => {
      nextTrack();
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [nextTrack, setProgress, setDuration]);

  const seek = (value) => {
    const audio = audioRef.current;
    if (audio.duration) {
      audio.currentTime = value * audio.duration;
      setProgress(value);
    }
  };

  return { seek };
};