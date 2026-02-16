import { memo } from 'react';
import { HeaderView } from './HeaderView';
import styles from './Header.module.scss';

interface HeaderProps {
  timer: number;
  flagsCount: number;
  totalMines: number;
  status: string;
  onRestart: () => void;
}

function HeaderComponent({ timer, flagsCount, totalMines, status, onRestart }: HeaderProps) {
  return (
    <HeaderView
      className={styles.header}
      timer={timer}
      flagsCount={flagsCount}
      totalMines={totalMines}
      status={status}
      onRestart={onRestart}
    />
  );
}

export const Header = memo(HeaderComponent);
