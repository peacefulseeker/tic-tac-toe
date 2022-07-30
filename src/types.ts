export type Turn = 'X' | 'O';
export type Board = Turn[][]; // shorter equivalent of Array<Array<Turn>>;

export type CellClick = (row: number, col: number) => void;
export type Reset = () => void;

// NOTE: when having type instead, hovering over gives mo insights on what's expected inside
export interface GameProps {
    turn: Turn;
    board: Board;
    status: string;
    onCellClick: CellClick;
}
export interface BoardStateProps {
    turn: Turn;
    board: Board;
    currentStep: number;
    cell: number[];
};

export interface GameReturnValue {
    turn: Turn;
    board: Board;
    status: string;
    winner: string | null;
    onCellClick: CellClick;
    onReset: Reset;
}

export type GameState = 'inprogress' | 'finished';
