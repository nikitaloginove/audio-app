import { useState } from 'react';

export const AddTrackForm = ({ onAddTrack }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const newTrack = {
      id: Date.now(),
      title: url.split('/').pop() || 'Без названия',
      url: url.trim()
    };

    onAddTrack(newTrack)
    setUrl('');
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      if (file.type.startsWith('audio/')) {
        const objectUrl = URL.createObjectURL(file);
        const newTrack = {
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^.]+$/, ''),
          url: objectUrl
        };

        onAddTrack(newTrack);
      };
    });
    e.target.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Добавить трек"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Добавить</button>
      </form>
      <div>
        <label>
          Загрузите файлы с компьютера
          <input type="file" accept="audio/*" multiple onChange={handleFileChange}/>
        </label>
      </div>
    </div>
  )
}