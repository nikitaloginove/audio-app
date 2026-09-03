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
    if (!finalAudioUrl) {
      alert('Пожалуйста, укажите ссылку на аудио или загрузите файл');
      return;
    }

    const finalCoverUrl = coverUrl.trim() || (coverFile ? URL.createObjectURL(coverFile) : '');

    const newTrack = {
      id: Date.now() + Math.random(),
      title: title.trim() || 'Без названия',
      artist: artist.trim() || 'Неизвестный исполнитель',
      url: finalAudioUrl,
      cover: finalCoverUrl,
    };

    onAddTrack(newTrack);

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
      if (!title) {
        setTitle(file.name.replace(/\.[^.]+$/, ''));
      }
    } else {
      alert('Пожалуйста, выберите аудиофайл');
    }
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file);
    } else {
      alert('Пожалуйста, выберите изображение');
    }
  };

  return (
      <div className={styles['add-track-form']}>
        <h3 className={styles['add-track-form__title']}>Добавить трек</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles['add-track-form__field']}>
            <label className={styles['add-track-form__label']}>
              Название трека:
              <input
                  type="text"
                  className={styles['add-track-form__input-text']}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Введите название"
              />
            </label>
          </div>

          <div className={styles['add-track-form__field']}>
            <label className={styles['add-track-form__label']}>
              Исполнитель:
              <input
                  type="text"
                  className={styles['add-track-form__input-text']}
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  placeholder="Введите исполнителя"
              />
            </label>
          </div>

          <div className={styles['add-track-form__field']}>
            <label className={styles['add-track-form__label']}>
              Ссылка на аудио (или загрузите файл ниже):
              <input
                  type="text"
                  className={styles['add-track-form__input-text']}
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  placeholder="https://example.com/track.mp3"
              />
            </label>
            <div className={styles['add-track-form__file-wrapper']}>
              <label className={styles['add-track-form__label']}>
                Или выберите аудиофайл:
                <input
                    type="file"
                    className={styles['add-track-form__input-file']}
                    accept="audio/*"
                    onChange={handleAudioFileChange}
                />
              </label>
              {audioFile && (
                  <span className={styles['add-track-form__selected-file']}>
                Выбран: {audioFile.name}
              </span>
              )}
            </div>
          </div>

          <div className={styles['add-track-form__field']}>
            <label className={styles['add-track-form__label']}>
              Ссылка на обложку (или загрузите картинку):
              <input
                  type="text"
                  className={styles['add-track-form__input-text']}
                  value={coverUrl}
                  onChange={(e) => setCoverUrl(e.target.value)}
                  placeholder="https://example.com/cover.jpg"
              />
            </label>
            <div className={styles['add-track-form__file-wrapper']}>
              <label className={styles['add-track-form__label']}>
                Или выберите изображение:
                <input
                    type="file"
                    className={styles['add-track-form__input-file']}
                    accept="image/*"
                    onChange={handleCoverFileChange}
                />
              </label>
              {coverFile && (
                  <span className={styles['add-track-form__selected-file']}>
                Выбрано: {coverFile.name}
              </span>
              )}
            </div>
          </div>

          <button type="submit" className={styles['add-track-form__submit']}>
            Добавить трек
          </button>
        </form>
      </div>
  );
};