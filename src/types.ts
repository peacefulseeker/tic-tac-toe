export type Turn = 'X' | 'O';
export type Board = Turn[][]; // shorted equivalent of Array<Array<Turn>>;

export type CellClick = (row: number, col: number) => void;

// NOTE: when having type instead, hovering over gives mo insights on what's expected inside
export interface GameProps {
    board: Board;
    status: string;
    onCellClick: CellClick;
}
export interface BoardStateProps {
    turn: Turn;
    board: Board;
    currentStep: number;
};

export interface GameReturnValue {
    board: Board;
    status: string;
    winner: string | null;
    onCellClick: CellClick;
}

export type GameState = 'inprogress' | 'finished';
