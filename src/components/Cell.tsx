
import styled from 'styled-components';

interface CellProps {
    size: number;
    // TODO: how to combine such case into 1 type? Or perhaps better have separate types for Cell/StyledCell, reusing what can be reused
    index?: number;
    "data-index"?: number;
    onCellClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const StyledCell = styled.div<CellProps>`
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    box-shadow: 0 0 0 1px coral;
    margin: 0 0 1px 1px;
`;

export default function Cell({ size, index, onCellClick }: CellProps) {
    return <StyledCell data-index={index} size={size} onClick={onCellClick} />;
}
