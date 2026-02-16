import { memo } from 'react';
import type { Board as BoardType } from '@/types';
import type { GameConfig } from '@/types';
import { Cell } from '../Cell';
import styles from './Board.module.scss';

interface BoardProps {
  board: BoardType | null;
  config: GameConfig;
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (e: React.MouseEvent, row: number, col: number) => void;
}

function BoardComponent({ board, config, onCellClick, onCellRightClick }: BoardProps) {
  if (!board) {
    const { rows, cols } = config;
    return (
      <div className={styles.board} role="grid">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className={styles.board__row} role="row">
            {Array.from({ length: cols }, (_, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                type="button"
                className={styles.board__startCell}
                onClick={() => onCellClick(rowIndex, colIndex)}
                title="Click to start"
              />
            ))}
          </div>
        ))}
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
