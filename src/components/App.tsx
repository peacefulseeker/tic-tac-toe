import Grid from "./Grid";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Arial;
    }
`;
const Container = styled.div`
    margin: 0 auto;
    width: 1200px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 40px;
`;

export default function App() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>Welcome to Tic-Tac-Toe game</Title>
                <Grid size={3} />
            </Container>
        </>
    );
}
