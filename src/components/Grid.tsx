
import styled from 'styled-components';
import Cell from "./Cell";

interface GridProps {
    size: number;
}

const StyledGrid = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: auto auto auto;
`;

export default function Grid({ size }: GridProps) {
    const onCellClick = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log(e.currentTarget);
        const { index } = e.currentTarget.dataset;
        console.log(`Cell with key ${index} clicked`);
    };

    return (
        <StyledGrid>
            {[...Array(size * size)].map((_, key) => (
                <Cell key={key} index={key} size={50} onCellClick={onCellClick} />
            ))}
        </StyledGrid>
    );
}
