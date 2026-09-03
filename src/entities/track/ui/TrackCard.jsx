import styles from './TrackCard.module.css';

export const TrackCard = ({ track, onRemove }) => {
  const { id, title, artist, cover } = track;

  return (
    <div className={styles['track-card']}>
      {cover ? (
          <img
              src={cover}
              alt={title}
              className={styles['track-card__cover']}
          />
      ) : (
          <div className={styles['track-card__placeholder']}>
            Без обложки
          </div>
      )}
      <h3 className={styles['track-card__title']}>{title}</h3>
      <p className={styles['track-card__artist']}>{artist}</p>
      <button
          onClick={() => onRemove(id)}
          className={styles['track-card__delete-btn']}
      >
        ✕ Удалить
      </button>
    </div>
  );
};