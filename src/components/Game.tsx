import styled from 'styled-components';
import Cell, { StyledCell } from "./Cell";
import { GameProps, Turn } from "../types";

const StyledGrid = styled.div<{ disabled: boolean; }>`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${props => props.disabled && `
        ${StyledCell} {
            background: #ccc;
            pointer-events: none;
        }
    `}
`;

const Row = styled.div`
    display: flex;
`;

export default function Game({ board, status, onCellClick }: GameProps) {
    return (
        <StyledGrid disabled={status === 'finished'}>
            {board.map((boardRow: Turn[], rowIndex: number) => (
                <Row key={rowIndex}>
                    {boardRow.map((turn: Turn, colIndex: number) => (
                        <Cell key={colIndex} value={turn} size={100} onCellClick={e => onCellClick(rowIndex, colIndex)} />
                    ))}
                </Row>
            ))}
        </StyledGrid>
    );
}
