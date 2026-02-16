import { memo } from 'react';
import type { PresetId } from '@/types';
import styles from './Header.module.scss';

interface HeaderViewProps {
  className: string;
  presetId: PresetId;
  presetOptions: { id: PresetId; label: string }[];
  onPresetChange: (id: PresetId) => void;
  timer: number;
  flagsCount: number;
  totalMines: number;
  status: string;
  onRestart: () => void;
}

function HeaderViewComponent({
  className,
  presetId,
  presetOptions,
  onPresetChange,
  timer,
  flagsCount,
  totalMines,
  status,
  onRestart,
}: HeaderViewProps) {
  const formatNumber = (n: number) => String(n).padStart(3, '0');
  const remainingFlags = totalMines - flagsCount;

  return (
    <header className={className}>
      <select
        className={styles.header__size}
        value={presetId}
        onChange={(e) => onPresetChange(e.target.value as PresetId)}
        title="Размер поля"
        aria-label="Размер поля"
      >
        {presetOptions.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
      <div className={styles.header__display}>
        <span className={styles.header__counter} aria-label="Flags remaining">
          {formatNumber(Math.max(0, remainingFlags))}
        </span>
      </div>
      <button
        type="button"
        className={styles.header__restart}
        onClick={onRestart}
        title="Restart"
        aria-label="Restart game"
      >
        {status === 'game-over' ? '😵' : status === 'victory' ? '😎' : '🙂'}
      </button>
      <div className={styles.header__display}>
        <span className={styles.header__counter} aria-label="Elapsed time">
          {formatNumber(timer)}
        </span>
      </div>
    </header>
  );
}

export const HeaderView = memo(HeaderViewComponent);
