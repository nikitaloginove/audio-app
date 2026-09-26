import { usePlayerStore } from '../../../shared/lib/store/playerStore';
import { useAudio } from '../../../shared/lib/audio/useAudio';
import styles from './Player.module.css';

export const Player = () => {
  const {
    tracks,
    currentTrackIndex,
    isPlaying,
    volume,
    progress,
    duration,
    togglePlay,
    nextTrack,
    prevTrack,
    setVolume,
  } = usePlayerStore();

  const { seek } = useAudio();
  const currentTrack = tracks[currentTrackIndex];

  const formatTime = (sec) => {
    if (!sec || isNaN(sec)) return '0:00';
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
      <div className={styles['player']}>
        <div className={styles['player__track-info']}>
          {currentTrack ? (
              <>
                <span className={styles['player__title']}>{currentTrack.artist}</span>
                <span className={styles['player__artist']}>{currentTrack.title}</span>
              </>
          ) : (
              <span className={styles['player__empty']}>Нет трека</span>
          )}
        </div>
        <div className={styles['player__controls']}>
          <button onClick={prevTrack} disabled={!currentTrack}>⏮</button>
          <button onClick={togglePlay} disabled={!currentTrack}>
            {isPlaying ? '⏸' : '▶️'}
          </button>
          <button onClick={nextTrack} disabled={!currentTrack}>⏭</button>
        </div>
        <div className={styles['player__progress']}>
          <span>{formatTime(progress * duration)}</span>
          <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!currentTrack}
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className={styles['player__volume']}>
          <span>🔊</span>
          <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
  );
};