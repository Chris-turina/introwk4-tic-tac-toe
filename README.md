| Behavior                                                              | Input                    | Output           |
|-----------------------------------------------------------------------|--------------------------|------------------|
| the program shows a grid of squares                                   | ""                       | squares          |
| when a square is clicked, gets filled with an X                       | "click square"           | "X"              |
| after a square is clicked, the turn is passed                         | "click square"           | "turn passes"    |
| when a square is clicked, output X or O depending on whose turn it is | "player 2 clicks square" | "O"              |
| doesn't allow invalid moves                                           | "clicks invalid square"  | does nothing     |
| when board is filled, game is a draw                                  | "all squares clicked"    | "draw"           |
| if a player gets 3 in a row, they win                                 | "3 symbols in a row"     | "win! (or lose)" |
| if player has won, don't accept input                                 | "click"                  | nothing          |
| user can press start button to start the game                         | "press start"            | game starts      |
