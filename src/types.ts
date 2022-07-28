export type Turn = 'X' | 'O';
export type Board = Turn[][]; // shorted equivalent of Array<Array<Turn>>;


// NOTE: when having type instead, hovering over gives mo insights on what's expected inside
export interface GridProps {
    size: number;
}
export interface GameStateProps {
    finished: boolean;
    draw: boolean;
};
export interface BoardStateProps {
    turn: Turn;
    board: Board;
    currentStep: number;
};
