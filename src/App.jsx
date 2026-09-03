import { useState, useEffect } from 'react';
import { AddTrackForm } from './features/add-track/AddTrackForm';
import { TrackCard } from './entities/track/ui/TrackCard';
import { Header } from './widgets/header/ui/Header';
import { Profile } from './widgets/profile/ui/Profile';
import styles from './App.module.css';

const STORAGE_KEY = 'tracks';

function App() {
  const [tracks, setTracks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(track => track && typeof track.url === 'string' && !track.url.startsWith('blob:'));
          return valid;
        }
      }
    } catch (e) {
      console.error('Ошибка чтения tracks:', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tracks));
  }, [tracks]);

  const handleAddTrack = (newTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  };

  const handleRemoveTrack = (id) => {
    setTracks((prev) => {
      const removed = prev.find(t => t.id === id);
      if (removed) {
        if (removed.url && removed.url.startsWith('blob:')) URL.revokeObjectURL(removed.url);
        if (removed.cover && removed.cover.startsWith('blob:')) URL.revokeObjectURL(removed.cover);
      }
      return prev.filter(track => track.id !== id);
    });
  };

  return (
      <>
        <Header />
        <div className={styles['app']}>
          <div className={styles['app__layout']}>
            <aside className={styles['app__sidebar']}>
              <Profile />
            </aside>
            <main className={styles['app__main']}>
              <AddTrackForm onAddTrack={handleAddTrack} />
            </main>
          </div>
          <section>
            <h2 className={styles['app__section-title']}>Список треков ({tracks.length})</h2>
            <div className={styles['track-list']}>
              {tracks.map((track) => (
                  <TrackCard key={track.id} track={track} onRemove={handleRemoveTrack} />
              ))}
            </div>
          </section>
        </div>
      </>
  );
}

export default App;