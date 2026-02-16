import { Game } from '@/components';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.app__title}>Сапёр</h1>
      <Game />
    </div>
  );
}
