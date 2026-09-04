import { TrackCard } from '../../entities/track/ui/TrackCard';
import styles from './PlaylistPage.module.css';

export const PlaylistPage = ({ tracks, onRemoveTrack }) => {
  return (
      <div className={styles['playlist-page']}>
        <h2 className={styles['playlist-page__title']}>
          Медиатека
        </h2>
        <div className={styles['playlist-page__grid']}>
          {tracks.map((track) => (
              <TrackCard key={track.id} track={track} onRemove={onRemoveTrack} />
          ))}
        </div>
      </div>
  );
};