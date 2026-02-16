import { memo } from 'react';
import type { Cell as CellType } from '@/types';
import { CellView } from './CellView';
import styles from './Cell.module.scss';

interface CellProps {
  cell: CellType;
  onClick: (row: number, col: number) => void;
  onRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}

function CellComponent({ cell, onClick, onRightClick }: CellProps) {
  const handleClick = () => onClick(cell.row, cell.col);
  const handleContextMenu = (e: React.MouseEvent) => onRightClick(e, cell.row, cell.col);

  const modifiers: string[] = [];
  if (cell.state === 'opened') modifiers.push('opened');
  if (cell.state === 'flagged') modifiers.push('flagged');
  if (cell.hasMine && cell.state === 'opened') modifiers.push('mine');
  if (cell.state === 'opened' && cell.adjacentMines > 0) {
    modifiers.push(`num-${cell.adjacentMines}`);
  }

  const modifierClasses = modifiers
    .map(m => styles[`cell--${m}`])
    .filter(Boolean)
    .join(' ');

  const classNames = `${styles.cell} ${modifierClasses}`.trim();

  return (
    <CellView
      className={classNames}
      cell={cell}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    />
  );
}

export const Cell = memo(CellComponent);
