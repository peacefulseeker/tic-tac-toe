
import { useState, useCallback, useMemo, useEffect } from "react";
import { GAME_FINISHED, GAME_INPROGRESS, GAME_PENDING } from "../const";

import { Board, BoardStateProps, GameReturnValue, GameState, CellClick, WinnerLine } from '../types';

const initialBoardState: BoardStateProps = {
    turn: 'X',
    board: [[], [], []],
    currentStep: 0,
    cell: [],
};

const generateBoard = (boardSize: number) => {
    return Array(boardSize).fill(null).map(_ => Array(boardSize).fill(''));
};

const useTicTacToe = (initialBoardSize: number): GameReturnValue => {
    const [boardSize, setBoardSize] = useState<number>(initialBoardSize);
    const maxSteps = useMemo(() => boardSize * boardSize, [boardSize]);
    const minimumStepsToWin = useMemo(() => boardSize + 2, [boardSize]);
    const [winner, setWinner] = useState<string | null>(null);
    const [status, setStatus] = useState<GameState>(GAME_PENDING);

    const [{ board, cell, turn, currentStep }, setBoardState] = useState<BoardStateProps>(() => {
        const board: Board = generateBoard(boardSize);
        return {
            ...initialBoardState,
            board,
        };
    });

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

    const onReset = useCallback(() => {
        setBoardState({
            ...initialBoardState,
            board: generateBoard(boardSize),
        });
        setWinner(null);
        setStatus(GAME_PENDING);
    }, [boardSize]);


    // onBoardSize change rebuild the board
    useEffect(() => {
        onReset();
    }, [boardSize, onReset]);

    // check whether there is a winner
    useEffect(() => {
        if (currentStep === 0) {
            return;
        } else {
            setStatus(GAME_INPROGRESS);
        }

        // no point to check winner too early
        if (currentStep >= minimumStepsToWin) {
            const [row, col] = cell;
            console.log(`Cell [${row}, ${col}]  clicked`, board);

            const turn = board[row][col];

            let haveWinner = false;
            const horizontal: WinnerLine = [];
            const vertical: WinnerLine = [];
            const diagonal1: WinnerLine = [];
            const diagonal2: WinnerLine = [];

            for (let index = 0; index < boardSize; index++) {
                horizontal.push(board[row][index]);
                vertical.push(board[index][col]);
                diagonal1.push(board[index][index]);
                diagonal2.push(board[index][boardSize - (index + 1)]);
            }

            if (
                horizontal.every(val => val === turn)
                || vertical.every(val => val === turn)
                || diagonal1.every(val => val === turn)
                || diagonal2.every(val => val === turn)
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

    }, [board, cell, currentStep, boardSize, maxSteps, minimumStepsToWin]);

    return { turn, board, status, winner, boardSize, onCellClick, onReset, setBoardSize };
};

export default useTicTacToe;
