
import { useState } from "react";
import styled from 'styled-components';
import Cell from "./Cell";

const StyledGrid = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto auto;
`;

interface GridProps {
    size: number;
}

type Turn = 'X' | 'O';
interface StateProps {
    turn: Turn;
    finished: boolean;
}
const initialState: StateProps = {
    turn: 'X',
    finished: false,
};



export default function Grid({ size }: GridProps) {
    const [gameState, setGameState] = useState(initialState);
    const { turn, finished } = gameState;

    const onCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget);
        const { index } = e.currentTarget.dataset;
        if (turn === 'X') {
            e.currentTarget.textContent = turn;
            setGameState(prevState => ({
                ...prevState,
                turn: 'O',
            }));
        } else {
            e.currentTarget.textContent = turn;
            setGameState(prevState => ({
                ...prevState,
                turn: 'X'
            }));
        }
        console.log(`Cell with key ${index} clicked`);
    };

    return (
        finished
            ? <div>Game finished and the winner is {turn}</div>
            : <StyledGrid>
                {[...Array(size * size)].map((_, key) => (
                    <Cell key={key} index={key} size={50} onCellClick={onCellClick} />
                ))}
            </StyledGrid>
    );
}
