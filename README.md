# Simle TicTacToe game, built with React/TypeScript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Grid component:
- takes size property, which will indicate total amount of rows and cols for the game

### Row component:
- serves as a visual separator between cells in a row.

### Cell component:
- takes size prop, and Grid will be as large, as individual width of row of cells will be

### Business logic on cell click:
- what is the current status of the game? In-progress / Finished(won/lost)?
- which cell is clicked (row, col)
- ensure cell not filled with value before proceeding
- Fill the cell with X or O
- update the board state
- check the winner
- finish the game –> winner found or draw

### Potential enhancements:
- create a bot gameplay?(select mode bot | multiplayer).
- enter names of players so it's more visible who's turn it is.
- create test coverages with multiple scenarios.
- remember game state on page reload.
