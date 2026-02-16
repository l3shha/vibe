import type { GameConfig } from '@/types';

export const GAME_CONFIG: GameConfig = {
  rows: 10,
  cols: 10,
  minesCount: 15,
};

export const TOTAL_CELLS = GAME_CONFIG.rows * GAME_CONFIG.cols;
