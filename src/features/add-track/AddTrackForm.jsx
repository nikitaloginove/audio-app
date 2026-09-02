import { useState } from 'react';
import styles from './AddTrackForm.module.css';

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
    <div className={styles.formWrapper}>
      <h3>Добавить трек</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.fieldGroup}>
          <label>
            Название трека:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название"
            />
          </label>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            Исполнитель:
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Введите исполнителя"
            />
          </label>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            Ссылка на аудио (или загрузите файл ниже):
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://example.com/track.mp3"
            />
          </label>
          <div className={styles.fileInputWrapper}>
            <label>
              Или выберите аудиофайл:
              <input type="file" accept="audio/*" onChange={handleAudioFileChange} />
            </label>
            {audioFile && <span className={styles.selectedFile}>Выбран: {audioFile.name}</span>}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            Ссылка на обложку (или загрузите картинку):
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />
          </label>
          <div className={styles.fileInputWrapper}>
            <label>
              Или выберите изображение:
              <input type="file" accept="image/*" onChange={handleCoverFileChange} />
            </label>
            {coverFile && <span className={styles.selectedFile}>Выбрано: {coverFile.name}</span>}
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>Добавить трек</button>
      </form>
  </div>
  );

}