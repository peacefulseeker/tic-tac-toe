import styled from "styled-components";
import useTicTacToe from "../hooks/useTicTacToe";
import Game from "./Game";
import { GRID_SIZE, GAME_FINISHED, GAME_INPROGRESS } from "../const";
import GlobalStyle from "./GlobalStyle";

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

const ResetButton = styled.button`
    cursor: pointer;
    padding: 15px 30px;
    font-size: 20px;
    font-weight: 600;
    border: 0;
    border-radius: 4px;
    background-color: rgb(255 127 80 / 80%);
    transition: ease-in-out background-color .2s;

    &:hover {
        background-color: rgb(255 127 80);
    }
`;


export default function App() {
    const game = useTicTacToe(GRID_SIZE);
    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>Welcome to Tic-Tac-Toe game</Title>
                {game.status === GAME_INPROGRESS && <p>Start playing</p>}
                {game.status === GAME_FINISHED && (
                    <>
                        <ResetButton onClick={game.onReset}>Reset</ResetButton>
                        <FinishedHeading>Game finished and {game.winner ? `the winner is ${game.winner}` : 'it\'s a draw'}</FinishedHeading>
                    </>
                )}
                {<Game turn={game.turn} board={game.board} status={game.status} onCellClick={game.onCellClick} />}
            </Container>
        </>
    );
}
