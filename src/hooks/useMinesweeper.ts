import { useState, useCallback } from 'react';
import type { Board, GameConfig, GameStatus } from '@/types';
import { PRESETS, DEFAULT_PRESET, getTotalCells } from '@/config';
import {
  createBoard,
  revealCell,
  toggleFlag,
  countFlaggedCells,
  checkVictory,
} from '@/utils/game';

export function useMinesweeper() {
  const [config, setConfigState] = useState<GameConfig>(() => PRESETS[DEFAULT_PRESET]);
  const [board, setBoard] = useState<Board | null>(null);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const initBoard = useCallback((row: number, col: number) => {
    const newBoard = createBoard(config, row, col);
    setBoard(newBoard);
    setStatus('playing');
    setStartTime(Date.now());
    setIsFirstClick(false);
    return newBoard;
  }, [config]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (status === 'game-over' || status === 'victory') return;

    let currentBoard = board;

    if (isFirstClick) {
      currentBoard = initBoard(row, col);
    }

    if (!currentBoard) return;

    const cell = currentBoard[row][col];
    if (cell.state === 'opened' || cell.state === 'flagged') return;

    if (cell.hasMine) {
      setStatus('game-over');
      setBoard(
        currentBoard.map(r =>
          r.map(c => (c.hasMine ? { ...c, state: 'opened' as const } : c))
        )
      );
      return;
    }

    const newBoard = revealCell(currentBoard, row, col);
    setBoard(newBoard);

    const totalCells = getTotalCells(config);
    if (checkVictory(newBoard, totalCells, config.minesCount)) {
      setStatus('victory');
    }
  }, [board, config, status, isFirstClick, initBoard]);

  const handleRightClick = useCallback(
    (e: React.MouseEvent, row: number, col: number) => {
      e.preventDefault();
      if (status === 'game-over' || status === 'victory') return;
      if (!board) return;

      const cell = board[row][col];
      if (cell.state === 'opened') return;

      setBoard(toggleFlag(board, row, col));
    },
    [board, status]
  );

  const restart = useCallback(() => {
    setBoard(null);
    setStatus('idle');
    setStartTime(null);
    setIsFirstClick(true);
  }, []);

  const setConfig = useCallback((newConfig: GameConfig) => {
    setConfigState(newConfig);
    setBoard(null);
    setStatus('idle');
    setStartTime(null);
    setIsFirstClick(true);
  }, []);

  const flagsCount = board ? countFlaggedCells(board) : 0;

  return {
    board,
    config,
    setConfig,
    status,
    startTime,
    flagsCount,
    handleCellClick,
    handleRightClick,
    restart,
  };
}
