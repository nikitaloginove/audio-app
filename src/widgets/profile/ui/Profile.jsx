import { useState } from 'react';
import { ProfileEditModal } from './ProfileEditModal';
import styles from './Profile.module.css';

const getProfile = () => {
  try {
    const data = localStorage.getItem('userProfile');
    return data ? JSON.parse(data) : { name: '', city: '', avatar: '' };
  } catch { return { name: '', city: '', avatar: '' }; }
};
const saveProfile = (profile) => {
  localStorage.setItem('userProfile', JSON.stringify(profile));
};

export const Profile = () => {
  const [profile, setProfile] = useState(getProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (newProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
    setIsModalOpen(false);
  };

  return (
      <div className={styles['profile']}>
        <div className={styles['profile__wrapper']}>
          <div className={styles['profile__avatar']}>
            {profile.avatar ? (
                <img src={profile.avatar} alt="avatar" />
            ) : (
                <div className={styles['profile__avatar-placeholder']}>
                  <span>👤</span>
                </div>
            )}
          </div>
          <div className={styles['profile__info']}>
            <div className={styles['profile__name']}>{profile.name || 'Гость'}</div>
            <div className={styles['profile__city']}>{profile.city || 'Город не указан'}</div>
          </div>
        </div>
        <button className={styles['profile__edit-btn']} onClick={() => setIsModalOpen(true)}>
          Редактировать
        </button>
        <ProfileEditModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialProfile={profile}
        />
      </div>
  );
};