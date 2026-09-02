import { useState } from "react";
import {AddTrackForm} from "./features/add-track/AddTrackForm.jsx";
import styles from './App.module.css';

function App() {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (newTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  }

  const handleRemoveTrack = (id) => {
    setTracks((prev) => {
      const removed = prev.find(t => t.id === id);

      if (removed) {
        if (removed.url && removed.url.startsWith('blob:')) {
          URL.revokeObjectURL(removed.url);
        }

        if (removed.cover && removed.cover.startsWith('blob:')) {
          URL.revokeObjectURL(removed.cover);
        }
      }

      return prev.filter(track => track.id !== id);
    })
  }

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.appTitle}>🎵 Мой аудиоплеер</h1>

      <AddTrackForm onAddTrack={handleAddTrack} />

      <h2 className={styles.sectionTitle}>Список треков ({tracks.length})</h2>

      <div className={styles.tracksGrid}>
        {tracks.map((track) => (
          <div key={track.id} className={styles.trackCard}>
            {track.cover ? (
              <img
                src={track.cover}
                alt={track.title}
                className={styles.trackCover}
              />
            ) : (
              <div className={styles.coverPlaceholder}>Без обложки</div>
            )}
            <h3 className={styles.trackTitle}>{track.title}</h3>
            <p className={styles.trackArtist}>{track.artist}</p>
            <button
              onClick={() => handleRemoveTrack(track.id)}
              className={styles.deleteButton}
            >
              ✕ Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );

}

export default App
