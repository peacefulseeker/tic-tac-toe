import styled, { createGlobalStyle } from "styled-components";
import useTicTacToe from "../hooks/useTicTacToe";
import Game from "./Game";
import { GRID_SIZE, GAME_FINISHED, GAME_INPROGRESS } from "../const";


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

const FinishedHeading = styled.h4`
    color: coral;
`;


export default function App() {
    const game = useTicTacToe(GRID_SIZE);
    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>Welcome to Tic-Tac-Toe game</Title>
                {game.status === GAME_INPROGRESS && <p>Just start playing</p>}
                {game.status === GAME_FINISHED && (
                    <FinishedHeading>Game finished and {game.winner ? `the winner is ${game.winner}` : 'it\'s a draw'}</FinishedHeading>
                )}
                {<Game board={game.board} status={game.status} onCellClick={game.onCellClick} />}
            </Container>
        </>
    );
}
