### Specs

| Behavior                                                              | Input                    | Output           |
|-----------------------------------------------------------------------|--------------------------|------------------|
| start button starts the game                                          | "start"                  | game starts      |
| when a square is clicked, gets filled with an X                       | "click square"           | "X"              |
| after a square is clicked, the turn is passed                         | "click square"           | "turn passes"    |
| when a square is clicked, output X or O depending on whose turn it is | "player 2 clicks square" | "O"              |
| when board is filled, game is a draw                                  | "all squares clicked"    | "draw"           |
| if a player gets 3 in a row, they win                                 | "3 symbols in a row"     | "win! (or lose)" |
