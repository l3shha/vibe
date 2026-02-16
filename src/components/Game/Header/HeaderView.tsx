import { memo } from 'react';
import styles from './Header.module.scss';

interface HeaderViewProps {
  className: string;
  timer: number;
  flagsCount: number;
  totalMines: number;
  status: string;
  onRestart: () => void;
}

function HeaderViewComponent({
  className,
  timer,
  flagsCount,
  totalMines,
  status,
  onRestart,
}: HeaderViewProps) {
  const formatNumber = (n: number) => String(n).padStart(3, '0');
  const remainingFlags = totalMines - flagsCount;

  return (
    <header className={className}>
      <div className={styles.header__display}>
        <span className={styles.header__counter} aria-label="Flags remaining">
          {formatNumber(Math.max(0, remainingFlags))}
        </span>
      </div>
      <button
        type="button"
        className={styles.header__restart}
        onClick={onRestart}
        title="Restart"
        aria-label="Restart game"
      >
        {status === 'game-over' ? '😵' : status === 'victory' ? '😎' : '🙂'}
      </button>
      <div className={styles.header__display}>
        <span className={styles.header__counter} aria-label="Elapsed time">
          {formatNumber(timer)}
        </span>
      </div>
    </header>
  );
}

export const HeaderView = memo(HeaderViewComponent);
