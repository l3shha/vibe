export type CellState = 'closed' | 'opened' | 'flagged';

export type GameStatus = 'idle' | 'playing' | 'game-over' | 'victory';

export interface Cell {
  id: string;
  row: number;
  col: number;
  hasMine: boolean;
  adjacentMines: number;
  state: CellState;
}

export type Board = Cell[][];

export interface GameConfig {
  rows: number;
  cols: number;
  minesCount: number;
}

export type PresetId = 'small' | 'medium' | 'large';

export const PRESET_IDS: PresetId[] = ['small', 'medium', 'large'];
