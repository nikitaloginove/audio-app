import { useState } from "react";
import {AddTrackForm} from "./features/add-track/AddTrackForm.jsx";

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
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <h1>🎵 Мой аудиоплеер</h1>

        <AddTrackForm onAddTrack={handleAddTrack} />

        <h2>Список треков ({tracks.length})</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {tracks.map((track) => (
              <div key={track.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                background: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}>
                {track.cover ? (
                    <img
                        src={track.cover}
                        alt={track.title}
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                ) : (
                    <div style={{
                      width: '100%',
                      height: '150px',
                      background: '#ccc',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#666'
                    }}>
                      Без обложки
                    </div>
                )}
                <h3 style={{ margin: '10px 0 5px', fontSize: '1.1rem' }}>{track.title}</h3>
                <p style={{ margin: '0 0 10px', color: '#555', fontSize: '0.9rem' }}>{track.artist}</p>
                <button
                    onClick={() => handleRemoveTrack(track.id)}
                    style={{
                      background: '#ff4d4d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '5px 12px',
                      cursor: 'pointer',
                    }}
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
