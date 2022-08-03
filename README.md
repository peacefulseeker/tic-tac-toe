# TicTacToe on React/TypeScript

With an option to choose a board size(3x3 is the default)

<img src="https://user-images.githubusercontent.com/25010454/182554789-a129a10b-86ee-4b8d-850e-65f85ee3b5b5.png" width="300"/>
<img src="https://user-images.githubusercontent.com/25010454/182554775-1ae68860-c229-4524-a7ed-0d8454c2a49b.png" width="254"/>


### Game component:
- takes size property, which will indicate total amount of rows and cols for the game

### Row component:
- serves as a visual separator between cells in a row.

### Cell component:
- takes size prop, and Board will be as large, as individual width of row of cells will be

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
