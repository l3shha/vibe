import { memo } from 'react';
import type { Cell as CellType } from '@/types';

interface CellViewProps {
  className: string;
  cell: CellType;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

function getContent(cell: CellType): string {
  if (cell.state === 'flagged') return '🚩';
  if (cell.state !== 'opened') return '';

  if (cell.hasMine) return '💣';
  if (cell.adjacentMines > 0) return String(cell.adjacentMines);

  return '';
}

function CellViewComponent({ className, cell, onClick, onContextMenu }: CellViewProps) {
  const content = getContent(cell);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      onContextMenu={onContextMenu}
      disabled={cell.state === 'opened'}
      tabIndex={0}
    >
      {content}
    </button>
  );
}

export const CellView = memo(CellViewComponent);
