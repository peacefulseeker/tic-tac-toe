
import { useCallback, useMemo, useState } from "react";
import styled from 'styled-components';
import Cell, { StyledCell } from "./Cell";
import { Turn, Board } from '../types';

const MINIMUM_STEPS_TO_WIN = 5;
const StyledGrid = styled.div<{ disabled: boolean; }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${props => props.disabled && `
        ${StyledCell} {
            background: grey;
            pointer-events: none;
        }
    `}
`;

const Row = styled.div`
    display: flex;
`;

// NOTE: when having type instead, hovering over gives mo insights on what's expected inside
interface GridProps {
    size: number;
}

interface GameStateProps {
    finished: boolean;
    draw: boolean;
};
interface BoardStateProps {
    turn: Turn;
    board: Board;
    currentStep: number;
};

const initialGameState: GameStateProps = {
    finished: false,
    draw: false,
};

const initialBoardState: BoardStateProps = {
    turn: 'X',
    board: [],
    currentStep: 1,
};

export default function Grid({ size }: GridProps) {
    const maxSteps = useMemo(() => size * size, [size]);
    const [{ finished, draw }, setGameState] = useState<GameStateProps>(initialGameState);
    const [{ turn, board, currentStep }, setBoardState] = useState<BoardStateProps>(() => {
        const board: Board = Array(size).fill(null).map(_ => Array(size).fill('-'));
        return {
            ...initialBoardState,
            board,
        };
    });

    // given that it's 3x3 field
    const hasWinner = useCallback((row: number, col: number) => {
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

    }, [board, turn]); // sort of beneficial, that any method can "watch" latest state of variables listed in dependencies

    const onCellClick = useCallback((cellNode: HTMLElement, row: number, col: number) => {
        if (cellNode.textContent) return;

        cellNode.textContent = turn;
        board[row][col] = turn;

        console.log(`Cell [${row}, ${col}]  clicked`, turn);

        // CAN START CHECKING THE WINNER AT THIS POINT
        if (currentStep >= MINIMUM_STEPS_TO_WIN) {
            if (hasWinner(row, col)) {
                return setGameState({
                    finished: true,
                    draw: false,
                });
            } else if (currentStep === maxSteps) {
                return setGameState({
                    finished: true,
                    draw: true,
                });
            };
        }

        setBoardState({
            turn: turn === 'X' ? 'O' : 'X',
            board,
            currentStep: currentStep + 1,
        });
    }, [turn, board, currentStep, maxSteps, hasWinner]);

    return (
        <>
            {finished && <h4>Game finished and {draw ? 'it\'s a draw' : `the winner is ${turn}`}</h4>}
            <StyledGrid disabled={finished}>
                {[...Array(size)].map((_, row) => (
                    <Row key={row}>
                        {[...Array(size)].map((_, col) => (
                            <Cell key={col} size={50} onCellClick={e => onCellClick(e.currentTarget, row, col)} />
                        ))}
                    </Row>
                ))}
            </StyledGrid>
        </>
    );
}
