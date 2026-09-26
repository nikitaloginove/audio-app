import { TrackCard } from '../../entities/track/ui/TrackCard';
import { usePlayerStore } from '../../shared/lib/store/playerStore';
import styles from './PlaylistPage.module.css';

export const PlaylistPage = ({ tracks, onRemoveTrack }) => {
  const handleSelectTrack = (index) => {
    usePlayerStore.getState().selectTrack(index);
  };

  return (
      <div className={styles['playlist-page']}>
        <h2 className={styles['playlist-page__title']}>
          Медиатека
        </h2>
        <div className={styles['playlist-page__grid']}>
          {tracks.map((track, index) => (
              <TrackCard
                  key={track.id}
                  track={track}
                  onRemove={onRemoveTrack}
                  onSelect={() => handleSelectTrack(index)}
              />
          ))}
        </div>
      </div>
  );
};