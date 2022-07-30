
import styled from 'styled-components';
import { Turn } from "../types";

interface CellProps {
    size: number;
    value: Turn;
    onCellClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const StyledCell = styled.div<{ size: number; value: string; }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    box-shadow: 0 0 0 1px coral;
    margin: 0 0 1px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.size / 3}px;
    cursor: pointer;
    transition: ease-in-out box-shadow .1s;

    ${props => props.value === 'X' && `
        background-color: rgb(255 127 80 / 80%);
    `}
    ${props => props.value === 'O' && `
        background-color: rgb(247 255 184);
    `}

    &:hover {
        box-shadow: 0 0 0 2px rgb(255 127 80 / 80%);;
    }
`;

export default function Cell({ size, value, onCellClick }: CellProps) {
    return <StyledCell value={value} size={size} onClick={onCellClick}>{value}</StyledCell>;
}
