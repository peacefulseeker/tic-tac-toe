
import styled from 'styled-components';
import { Turn } from "../types";

interface CellProps {
    size: number;
    value: Turn;
    onCellClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const StyledCell = styled.div<{ size: number; }>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    box-shadow: 0 0 0 1px coral;
    margin: 0 0 1px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.size / 4}px;
`;

export default function Cell({ size, value, onCellClick }: CellProps) {
    return <StyledCell size={size} onClick={onCellClick}>{value}</StyledCell>;
}
