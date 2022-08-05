import styled from "styled-components";
import useTicTacToe from "../hooks/useTicTacToe";
import Board from "./Board";
import {
    BOARD_SIZE, GAME_FINISHED, GAME_INPROGRESS, GAME_PENDING, AVAILABLE_BOARD_SIZES
} from "../const";
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

const Button = styled.button`
    cursor: pointer;
    margin: 0 10px;
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

const ResetButton = styled(Button)`
    margin: 0;
`;

const Placeholder = styled.div<{ hide: boolean; }>`
    ${props => props.hide && `
        opacity: 0;
    `}
`;


export default function App() {
    const game = useTicTacToe(BOARD_SIZE);
    return (
        <>
            <GlobalStyle />
            <Container>
                <Title>Welcome to Tic-Tac-Toe game(aka Noughts and Crosses)</Title>
                {game.status !== GAME_FINISHED && (
                    <>
                        {game.status === GAME_INPROGRESS && <h3>Game started!</h3>}
                        {game.status === GAME_PENDING && <h3>Choose board size or start playing</h3>}
                        <Placeholder hide={game.status === GAME_INPROGRESS}>
                            {AVAILABLE_BOARD_SIZES.map(size => (
                                game.boardSize !== size && <Button key={size} onClick={() => game.setBoardSize(size)}>{size}x{size}</Button>
                            ))}
                        </Placeholder>
                    </>
                )}
                {game.status === GAME_FINISHED && (
                    <>
                        <ResetButton onClick={game.onReset}>Reset</ResetButton>
                        <FinishedHeading>Game finished and {game.winner ? `the winner is ${game.winner}` : 'it\'s a draw'}</FinishedHeading>
                    </>
                )}
                {<Board turn={game.turn} board={game.board} status={game.status} onCellClick={game.onCellClick} />}
            </Container>
        </>
    );
}
