import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal';
import styles from './ProfileEditModal.module.css';

export const ProfileEditModal = ({ isOpen, onClose, onSave, initialProfile }) => {
  const [name, setName] = useState(initialProfile.name || '');
  const [city, setCity] = useState(initialProfile.city || '');
  const [avatar, setAvatar] = useState(initialProfile.avatar || '');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, city, avatar });
  };

  return (
      <Modal isOpen={isOpen} onClose={onClose} title="Редактировать профиль">
        <form onSubmit={handleSubmit} className={styles['edit-form']}>
          <div className={styles['edit-form__field']}>
            <label>Имя</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
            />
          </div>
          <div className={styles['edit-form__field']}>
            <label>Город</label>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Город проживания"
            />
          </div>
          <div className={styles['edit-form__field']}>
            <label>Аватар</label>
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            {avatar && <img src={avatar} alt="preview" className={styles['edit-form__avatar-preview']} />}
          </div>
          <button type="submit" className={styles['edit-form__submit']}>Сохранить</button>
        </form>
      </Modal>
  );
};