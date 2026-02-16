import type { GameConfig, PresetId } from '@/types';

export const PRESETS: Record<PresetId, GameConfig> = {
  small: { rows: 10, cols: 10, minesCount: 15 },
  medium: { rows: 16, cols: 16, minesCount: 40 },
  large: { rows: 20, cols: 20, minesCount: 60 },
};

export const PRESET_LABELS: Record<PresetId, string> = {
  small: '10×10',
  medium: '16×16',
  large: '20×20',
};

export const DEFAULT_PRESET: PresetId = 'small';

export function getTotalCells(config: GameConfig): number {
  return config.rows * config.cols;
}

export function getPresetIdByConfig(config: GameConfig): PresetId | null {
  const entry = Object.entries(PRESETS).find(
    ([, c]) =>
      c.rows === config.rows &&
      c.cols === config.cols &&
      c.minesCount === config.minesCount
  );
  return entry ? (entry[0] as PresetId) : null;
}
