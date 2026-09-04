import { AddTrackForm } from '../../features/add-track/AddTrackForm';
import styles from './UploadPage.module.css';

export const UploadPage = ({ onAddTrack }) => {
  return (
      <div className={styles['upload-page']}>
        <h2 className={styles['upload-page__title']}>Загрузить новый трек</h2>
        <AddTrackForm onAddTrack={onAddTrack} />
      </div>
  );
};