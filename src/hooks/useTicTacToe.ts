
import { useState, useCallback, useMemo, useEffect } from "react";
import { GAME_FINISHED, GAME_INPROGRESS, MINIMUM_STEPS_TO_CHECK_WINNER } from "../const";

import { Board, BoardStateProps, GameReturnValue, GameState, CellClick } from '../types';

const initialBoardState: BoardStateProps = {
    turn: 'X',
    board: [[], [], []],
    currentStep: 0,
    cell: [],
};

const useTicTacToe = (gridSize: number): GameReturnValue => {
    const maxSteps = useMemo(() => gridSize * gridSize, [gridSize]);
    const [winner, setWinner] = useState<string | null>(null);
    const [status, setStatus] = useState<GameState>(GAME_INPROGRESS);

    const [{ board, cell, turn, currentStep }, setBoardState] = useState<BoardStateProps>(() => {
        const board: Board = Array(gridSize).fill(null).map(_ => Array(gridSize).fill(''));
        return {
            ...initialBoardState,
            board,
        };
    });

    useEffect(() => {
        // can start checking winner when after 4th step is over
        if (currentStep >= MINIMUM_STEPS_TO_CHECK_WINNER) {
            let haveWinner = false;
            const [row, col] = cell;
            const turn = board[row][col];

            console.log(`Cell [${row}, ${col}]  clicked`, turn, board);

            if (
                // check horizontally
                (board[row][0] === turn && board[row][1] === turn && board[row][2] === turn)
                // check vertically
                || (board[0][col] === turn && board[1][col] === turn && board[2][col] === turn)
                // check 1 diagonal
                || (board[0][0] === turn && board[1][1] === turn && board[2][2] === turn)
                // check 2 diagonal
                || (board[2][0] === turn && board[1][1] === turn && board[0][2] === turn)
            ) {
                haveWinner = true;
            }

            if (haveWinner) {
                setWinner(turn);
                setStatus(GAME_FINISHED);
            } else if (currentStep === maxSteps) {
                setStatus(GAME_FINISHED); // winner will be `null` in this case which will be an indication of draw
            }
        }

    }, [board, maxSteps, cell, currentStep]);

    const onCellClick = useCallback<CellClick>((row, col) => {
        if (board[row][col]) return;

        const newBoard = board.map(arr => arr.slice());
        newBoard[row][col] = turn;

        setBoardState({
            board: newBoard,
            cell: [row, col],
            turn: turn === 'X' ? 'O' : 'X',
            currentStep: currentStep + 1,
        });
    }, [board, turn, currentStep]);

    return { board, status, winner, onCellClick };
};

export default useTicTacToe;
