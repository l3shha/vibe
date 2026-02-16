import { useMinesweeper } from '@/hooks';
import { useTimer } from '@/hooks';
import { Header } from '../Header';
import { Board } from '../Board';
import styles from './Game.module.scss';

export function Game() {
  const {
    board,
    config,
    setConfig,
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
        config={config}
        onConfigChange={setConfig}
        timer={timer}
        flagsCount={flagsCount}
        totalMines={config.minesCount}
        status={status}
        onRestart={restart}
      />
      <div className={styles.game__boardWrap}>
        <Board
          board={board}
          config={config}
          onCellClick={handleCellClick}
          onCellRightClick={handleRightClick}
        />
      </div>
    </div>
  );
}
