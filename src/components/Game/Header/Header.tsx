import { memo } from 'react';
import type { GameConfig } from '@/types';
import { PRESETS, PRESET_LABELS, getPresetIdByConfig } from '@/config';
import { PRESET_IDS } from '@/types';
import { HeaderView } from './HeaderView';
import styles from './Header.module.scss';

interface HeaderProps {
  config: GameConfig;
  onConfigChange: (config: GameConfig) => void;
  timer: number;
  flagsCount: number;
  totalMines: number;
  status: string;
  onRestart: () => void;
}

function HeaderComponent({
  config,
  onConfigChange,
  timer,
  flagsCount,
  totalMines,
  status,
  onRestart,
}: HeaderProps) {
  const presetId = getPresetIdByConfig(config) ?? 'small';

  return (
    <HeaderView
      className={styles.header}
      presetId={presetId}
      presetOptions={PRESET_IDS.map((id) => ({ id, label: PRESET_LABELS[id] }))}
      onPresetChange={(id) => onConfigChange(PRESETS[id])}
      timer={timer}
      flagsCount={flagsCount}
      totalMines={totalMines}
      status={status}
      onRestart={onRestart}
    />
  );
}

export const Header = memo(HeaderComponent);
