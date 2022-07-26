
import { useCallback, useState } from "react";
import styled from 'styled-components';
import Cell, { StyledCell } from "./Cell";

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

interface GridProps {
    size: number;
}

type Turn = 'X' | 'O';
type Board = Array<Array<string>>; // TODO: check whether it's a legit approach
interface StateProps {
    turn: Turn;
    finished: boolean;
    draw: boolean;
    board: Board;
    currentStep: number;
}

const initialState: StateProps = {
    turn: 'X',
    finished: false,
    draw: false,
    board: [],
    currentStep: 1,
};

export default function Grid({ size }: GridProps) {
    const [{ turn, finished, board, currentStep, maxSteps, draw }, setGameState] = useState(() => {
        const board: Board = Array(size).fill(null).map(_ => Array(size).fill('-'));
        const maxSteps = size * size;
        return {
            ...initialState,
            board,
            maxSteps,
        };
    });

    const hasWinner = useCallback((row: number, col: number) => {
        console.table(board);
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
        if (board[2][0] === turn && board[1][1] === turn && board[2][0] === turn) {
            return true;
        }

    }, [turn, board]);

    const onCellClick = useCallback((cellNode: HTMLElement, row: number, col: number) => {
        if (cellNode.textContent) return;

        const nextTurn = turn === 'X' ? 'O' : 'X';
        cellNode.textContent = turn;
        board[row][col] = turn;

        console.log(`Cell [${row}, ${col}]  clicked`, turn);

        // CAN START CHECKING THE WINNER AT THIS POINT
        if (currentStep >= MINIMUM_STEPS_TO_WIN) {
            if (hasWinner(row, col)) {
                console.log('FINISHED!');
                setGameState(prevState => ({
                    ...prevState,
                    finished: true,
                }));

                return null;
            } else if (currentStep === maxSteps) {
                console.log('DRAW!');
                setGameState(prevState => ({
                    ...prevState,
                    finished: true,
                    draw: true,
                }));

                return null;
            };
        }

        setGameState(prevState => ({
            ...prevState,
            turn: nextTurn,
            board,
            currentStep: currentStep + 1,
        }));

    }, [turn, board, currentStep, maxSteps, hasWinner]);

    return (
        <>
            {finished && <h4>Game finished {draw ? 'and it\'s draw' : `and the winner is ${turn}`}</h4>}
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
