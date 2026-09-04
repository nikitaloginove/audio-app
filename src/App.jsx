import { useState, useEffect } from 'react';
import { Header } from './widgets/header/ui/Header';
import { Sidebar } from './widgets/sidebar/Sidebar';
import { UploadPage } from './pages/upload-page/UploadPage';
import { PlaylistPage } from './pages/playlist-page/PlaylistPage';
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

  const [currentPage, setCurrentPage] = useState('upload');

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
        <div className={styles['layout']}>
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className={styles['main']}>
            {currentPage === 'upload' && <UploadPage onAddTrack={handleAddTrack} />}
            {currentPage === 'playlist' && (
                <PlaylistPage tracks={tracks} onRemoveTrack={handleRemoveTrack} />
            )}
          </main>
        </div>
      </>
  );
}

export default App;