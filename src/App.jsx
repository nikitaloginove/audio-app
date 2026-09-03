import { useState, useEffect } from 'react';
import { AddTrackForm } from './features/add-track/AddTrackForm';
import { TrackCard } from './entities/track/ui/TrackCard';
import styles from './App.module.css';

const STORAGE_KEY = 'tracks';

function App() {
  const [tracks, setTracks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const validTracks = parsed.filter(track => {
            return (
                track &&
                typeof track === 'object' &&
                typeof track.url === 'string' &&
                !track.url.startsWith('blob:')
            );
          });
          return validTracks;
        }
      }
    } catch (e) {
      console.error('Ошибка при чтении localStorage:', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
    } catch (error) {
      console.error('Ошибка при сохранении в localStorage:', error);
    }
  }, [tracks]);

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
          Список треков ({tracks?.length})
        </h2>
        <div className={styles['track-list']}>
          {tracks?.map((track) => (
              <TrackCard
                  key={track.id}
                  track={track}
                  onRemove={handleRemoveTrack}
              />
          ))}
        </div>
      </div>
  );
}

export default App;