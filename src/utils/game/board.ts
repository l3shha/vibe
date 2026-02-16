import type { Cell, Board, GameConfig } from '@/types';

const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],           [0, 1],
  [1, -1],  [1, 0],  [1, 1],
] as const;

function getCellId(row: number, col: number): string {
  return `${row}-${col}`;
}

function createEmptyCell(row: number, col: number): Cell {
  return {
    id: getCellId(row, col),
    row,
    col,
    hasMine: false,
    adjacentMines: 0,
    state: 'closed',
  };
}

function getNeighborCoords(
  row: number,
  col: number,
  rows: number,
  cols: number
): Array<[number, number]> {
  return DIRECTIONS
    .map(([dr, dc]) => [row + dr, col + dc] as [number, number])
    .filter(([r, c]) => r >= 0 && r < rows && c >= 0 && c < cols);
}

export function createBoard(
  config: GameConfig,
  excludeRow?: number,
  excludeCol?: number
): Board {
  const { rows, cols, minesCount } = config;

  const board: Board = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => createEmptyCell(row, col))
  );

  const excludeSet = new Set<string>();
  if (excludeRow !== undefined && excludeCol !== undefined) {
    excludeSet.add(`${excludeRow}-${excludeCol}`);
    for (const [r, c] of getNeighborCoords(excludeRow, excludeCol, rows, cols)) {
      excludeSet.add(`${r}-${c}`);
    }
  }

  let placed = 0;

  while (placed < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    const key = `${row}-${col}`;

    if (!excludeSet.has(key) && !board[row][col].hasMine) {
      board[row][col].hasMine = true;
      placed++;

      for (const [nr, nc] of getNeighborCoords(row, col, rows, cols)) {
        if (!board[nr][nc].hasMine) {
          board[nr][nc].adjacentMines += 1;
        }
      }
    }
  }

  return board;
}

export function revealCell(board: Board, row: number, col: number): Board {
  const cell = board[row][col];
  if (cell.state === 'opened' || cell.state === 'flagged') {
    return board;
  }

  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const stack: [number, number][] = [[row, col]];

  while (stack.length > 0) {
    const [r, c] = stack.pop()!;
    const current = newBoard[r][c];

    if (current.state === 'opened' || current.state === 'flagged') continue;

    newBoard[r][c] = { ...current, state: 'opened' as const };

    if (current.adjacentMines === 0 && !current.hasMine) {
      for (const [nr, nc] of getNeighborCoords(r, c, board.length, board[0].length)) {
        const neighbor = newBoard[nr][nc];
        if (neighbor.state === 'closed') {
          stack.push([nr, nc]);
        }
      }
    }
  }

  return newBoard;
}

export function toggleFlag(board: Board, row: number, col: number): Board {
  const cell = board[row][col];
  if (cell.state !== 'closed' && cell.state !== 'flagged') {
    return board;
  }

  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const newState = cell.state === 'flagged' ? 'closed' : 'flagged';
  newBoard[row][col] = { ...cell, state: newState };
  return newBoard;
}

export function countFlaggedCells(board: Board): number {
  return board.flat().filter(c => c.state === 'flagged').length;
}

export function checkVictory(
  board: Board,
  totalCells: number,
  minesCount: number
): boolean {
  const openedCount = board.flat().filter(c => c.state === 'opened').length;
  return openedCount === totalCells - minesCount;
}
