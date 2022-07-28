
import { useState, useCallback, useMemo, useEffect } from "react";
import { MINIMUM_STEPS_TO_WIN } from "../const";

import { Board, BoardStateProps, GameReturnValue, GameState, Turn, CellClick } from '../types';

const initialBoardState: BoardStateProps = {
    turn: 'X',
    board: [[], [], []],
    currentStep: 1,
};

const useTicTacToe = (gridSize: number): GameReturnValue => {
    const maxSteps = useMemo(() => gridSize * gridSize, [gridSize]);
    const [winner, setWinner] = useState<string | null>(null);
    const [status, setStatus] = useState<GameState>("inprogress");

    const [{ turn, board, currentStep }, setBoardState] = useState<BoardStateProps>(() => {
        const board: Board = Array(gridSize).fill(null).map(_ => Array(gridSize).fill(''));
        return {
            ...initialBoardState,
            board,
        };
    });

    // TODO: try with useEffect instead of hasWinner callback
    // perhaps will need to save pointer in the state with (row,col) clicked value
    useEffect(() => {
        console.log('board rerendered', board);
    }, [turn, board, currentStep, maxSteps]);

    // given that it's 3x3 field
    const hasWinner = useCallback((turn: Turn, board: Board, row: number, col: number) => {
        // check horizontally
        // row same, col to check vary
        if (board[row][0] === turn && board[row][1] === turn && board[row][2] === turn) {
            return true;
        }

        // check vertically
        // col same, row to check vary
        if (board[0][col] === turn && board[1][col] === turn && board[2][col] === turn) {
            return true;
        }

        // check 1 diagonal
        if (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn) {
            return true;
        }
        // check 2 diagonal
        if (board[2][0] === turn && board[1][1] === turn && board[0][2] === turn) {
            return true;
        }

        return false;

    }, []);

    const onCellClick = useCallback<CellClick>((row, col) => {
        if (board[row][col]) return;

        console.log(`Cell [${row}, ${col}]  clicked`, turn);

        const newBoard = board.map(arr => arr.slice());
        newBoard[row][col] = turn;

        // CAN START CHECKING THE WINNER AT THIS POINT
        if (currentStep >= MINIMUM_STEPS_TO_WIN) {
            if (hasWinner(turn, newBoard, row, col)) {
                setWinner(turn);
                setStatus("finished");
            } else if (currentStep === maxSteps) {
                setStatus("finished"); // winner will be `null` in this case which will be an indication of draw
            };
        }

        setBoardState({
            turn: turn === 'X' ? 'O' : 'X',
            board: newBoard,
            currentStep: currentStep + 1,
        });
    }, [turn, board, currentStep, maxSteps, hasWinner]);

    return { board, status, winner, onCellClick };
};

export default useTicTacToe;
