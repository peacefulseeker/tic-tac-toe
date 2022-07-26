import Grid from "./Grid";
import styled from "styled-components";

const Container = styled.div`
    margin: 0 auto;
    width: 1200px;
    text-align: center;
`;

const Title = styled.h1`
    font-family: Arial;
`;

export default function App() {
    return (
        <Container>
            <Title>Welcome to Tic-Tac-Toe game</Title>
            <Grid size={3} />
        </Container>
    );
}
