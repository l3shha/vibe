import { useState, useCallback } from 'react';
import type { Board, GameStatus } from '@/types';
import { GAME_CONFIG, TOTAL_CELLS } from '@/config';
import {
  createBoard,
  revealCell,
  toggleFlag,
  countFlaggedCells,
  checkVictory,
} from '@/utils/game';

export function useMinesweeper() {
  const [board, setBoard] = useState<Board | null>(null);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const initBoard = useCallback((row: number, col: number) => {
    const newBoard = createBoard(GAME_CONFIG, row, col);
    setBoard(newBoard);
    setStatus('playing');
    setStartTime(Date.now());
    setIsFirstClick(false);
    return newBoard;
  }, []);

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

    if (checkVictory(newBoard, TOTAL_CELLS, GAME_CONFIG.minesCount)) {
      setStatus('victory');
    }
  }, [board, status, isFirstClick, initBoard]);

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

  const flagsCount = board ? countFlaggedCells(board) : 0;

  return {
    board,
    config: GAME_CONFIG,
    status,
    startTime,
    flagsCount,
    handleCellClick,
    handleRightClick,
    restart,
  };
}
