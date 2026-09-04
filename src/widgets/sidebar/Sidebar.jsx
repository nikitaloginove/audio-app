import { Profile } from '../profile/ui/Profile';
import styles from './Sidebar.module.css';

export const Sidebar = ({ currentPage, onPageChange }) => {
  return (
      <aside className={styles['sidebar']}>
        <div className={styles['sidebar__profile']}>
          <Profile />
        </div>
        <nav className={styles['sidebar__nav']}>
          <ul className={styles['sidebar__menu']}>
            <li>
              <button
                  className={`${styles['sidebar__menu-item']} ${currentPage === 'upload' ? styles['sidebar__menu-item--active'] : ''}`}
                  onClick={() => onPageChange('upload')}
              >
                Загрузка
              </button>
            </li>
            <li>
              <button
                  className={`${styles['sidebar__menu-item']} ${currentPage === 'playlist' ? styles['sidebar__menu-item--active'] : ''}`}
                  onClick={() => onPageChange('playlist')}
              >
                Плейлист
              </button>
            </li>
          </ul>
        </nav>
      </aside>
  );
};