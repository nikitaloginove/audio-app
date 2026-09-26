import styles from './TrackCard.module.css';

export const TrackCard = ({ track, onRemove, onSelect }) => {
  const { id, title, artist, cover } = track;

  return (
      <div className={styles['track-card']} onClick={() => onSelect && onSelect()}>
        {cover ? (
            <img src={cover} alt={title} className={styles['track-card__cover']} />
        ) : (
            <div className={styles['track-card__placeholder']}>Без обложки</div>
        )}
        <h3 className={styles['track-card__title']}>{artist}</h3>
        <p className={styles['track-card__artist']}>{title}</p>
        <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
            className={styles['track-card__delete-btn']}
        >
          Удалить
        </button>
      </div>
  );
};