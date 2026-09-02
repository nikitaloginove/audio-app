import { useState } from 'react';

export const AddTrackForm = ({ onAddTrack }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [coverUrl, setCoverUrl] = useState('');


  const [audioFile, setAudioFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalAudioUrl = audioUrl.trim() || (audioFile ? URL.createObjectURL(audioFile) : '');
    if (!finalAudioUrl) return;

    const finalCoverUrl = coverUrl.trim() || (coverFile ? URL.createObjectURL(coverFile) : '');

    const newTrack = {
      id: Date.now() + Math.random(),
      title: title.trim() || 'Без названия',
      artist: artist.trim() || 'Неизвестный исполнитель',
      url: finalAudioUrl,
      cover: finalCoverUrl
    };

    onAddTrack(newTrack)
    setTitle('');
    setArtist('');
    setAudioUrl('');
    setCoverUrl('');
    setAudioFile(null);
    setCoverFile(null);
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
      <h3>Добавить трек</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Название трека:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Исполнитель:
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Введите исполнителя"
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Ссылка на аудио (или загрузите файл ниже):
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://example.com/track.mp3"
              style={{ marginLeft: '10px', width: '300px' }}
            />
          </label>
          <br />
          <label>
            Или выберите аудиофайл:
            <input
              type="file"
              accept="audio/*"
              onChange={handleAudioFileChange}
              style={{ marginLeft: '10px' }}
            />
          </label>
          {audioFile && <span> Выбран: {audioFile.name}</span>}
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            Ссылка на обложку (или загрузите картинку):
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://example.com/cover.jpg"
              style={{ marginLeft: '10px', width: '300px' }}
            />
          </label>
          <br />
          <label>
            Или выберите изображение:
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverFileChange}
              style={{ marginLeft: '10px' }}
            />
          </label>
          {coverFile && <span> Выбрано: {coverFile.name}</span>}
        </div>

        <button type="submit">Добавить трек</button>
      </form>
  </div>
  );

}