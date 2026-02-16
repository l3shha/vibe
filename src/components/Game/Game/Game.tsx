import { useMinesweeper } from '@/hooks';
import { useTimer } from '@/hooks';
import { Header } from '../Header';
import { Board } from '../Board';
import styles from './Game.module.scss';

export function Game() {
  const {
    board,
    config,
    status,
    startTime,
    flagsCount,
    handleCellClick,
    handleRightClick,
    restart,
  } = useMinesweeper();

  const isRunning = status === 'playing';
  const timer = useTimer(startTime, isRunning);

  return (
    <div className={styles.game}>
      <Header
        timer={timer}
        flagsCount={flagsCount}
        totalMines={config.minesCount}
        status={status}
        onRestart={restart}
      />
      <Board
        board={board}
        config={config}
        onCellClick={handleCellClick}
        onCellRightClick={handleRightClick}
      />
    </div>
  );
}
