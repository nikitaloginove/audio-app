import { useState } from 'react';
import { AddTrackForm } from './features/add-track/AddTrackForm';
import styles from './App.module.css';

function App() {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (newTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  };

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
    });
  };

  return (
      <div className={styles.app}>
        <h1 className={styles['app__title']}>🎵 Мой аудиоплеер</h1>

        <AddTrackForm onAddTrack={handleAddTrack} />

        <h2 className={styles['app__section-title']}>
          Список треков ({tracks.length})
        </h2>

        <div className={styles['track-list']}>
          {tracks.map((track) => (
              <div key={track.id} className={styles['track-card']}>
                {track.cover ? (
                    <img
                        src={track.cover}
                        alt={track.title}
                        className={styles['track-card__cover']}
                    />
                ) : (
                    <div className={styles['track-card__placeholder']}>
                      Без обложки
                    </div>
                )}
                <h3 className={styles['track-card__title']}>{track.title}</h3>
                <p className={styles['track-card__artist']}>{track.artist}</p>
                <button
                    onClick={() => handleRemoveTrack(track.id)}
                    className={styles['track-card__delete-btn']}
                >
                  ✕ Удалить
                </button>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;