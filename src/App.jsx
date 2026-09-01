import { useState } from "react";
import {AddTrackForm} from "./features/add-track/AddTrackForm.jsx";

function App() {
  const [tracks, setTracks] = useState([]);

  const handleAddTrack = (newTrack) => {
    setTracks((prev) => [...prev, newTrack]);
  }

  const handleRemoveTrack = (id) => {
    setTracks((prev) => {
      const removedTrack = prev.find(track => track.id === id);

      if (removedTrack && removedTrack.url.startsWith('blob:')) {
        URL.revokeObjectURL(removedTrack.url);
      }

      return prev.filter(track => track.id !== id);
    })
  }

  return (
    <div>
      <h1>Аудио плеер</h1>
      <AddTrackForm onAddTrack={handleAddTrack} />
      <h2>Список треков ({tracks.length})</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track?.id}>
            <strong>{track?.title}</strong>
            <a href={track?.url} target="_blank">открыть</a>
            <button onClick={() => handleRemoveTrack(track?.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
