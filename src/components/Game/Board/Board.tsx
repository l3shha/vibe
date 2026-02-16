import { memo } from 'react';
import type { Board as BoardType } from '@/types';
import { Cell } from '../Cell';
import styles from './Board.module.scss';

interface BoardProps {
  board: BoardType | null;
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}

function BoardComponent({ board, onCellClick, onCellRightClick }: BoardProps) {
  if (!board) {
    return (
      <div className={styles.board} data-placeholder>
        <div className={styles.board__placeholder}>
          Click any cell to start
        </div>
      </div>
    );
  }

  return (
    <div className={styles.board} role="grid">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.board__row} role="row">
          {row.map((cell) => (
            <Cell
              key={cell.id}
              cell={cell}
              onClick={onCellClick}
              onRightClick={onCellRightClick}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export const Board = memo(BoardComponent);
