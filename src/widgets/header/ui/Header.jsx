import styles from './Header.module.css';

export const Header = () => {
  return (
      <header className={styles['header']}>
        <div className={styles['header__content']}>
          <h1 className={styles['header__title']}>Аудиоплеер</h1>
        </div>
      </header>
  );
};