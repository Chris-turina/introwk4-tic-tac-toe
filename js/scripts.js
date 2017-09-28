// Game constructor and methods
function Game(players) {
  this.players = players;
  this.board = new Board();
}

// Player constructor and methods
function Player(id, mark) {
  this.id = id;
  this.mark = mark;
}

// Board constructor and methods
function Board() {
  // box has 0 = empty, 1 = player one, -1 = player two
  this.boxes = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

// space = [x, y] coordinates
Board.prototype.markBox = function(player, space) {
  var x = space[0];
  var y = space[1];
  if (player.id === 1) {
    this.boxes[y][x] = 1;
  }
  else if (player.id === 2) {
    this.boxes[y][x] = -1;
  }
}

$(document).ready(function() {
  var player1 = new Player(1, "O");
  var player2 = new Player(2, "X");
  var players = [player1, player2];
  var game = new Game(players);

  $(".box").click(function() {
    var x = $(this).attr("xCoordiante");
    var y = $(this).attr("yCoordiante");

    game.board.markBox(game.players[0], [x, y]);
    $(this).text(game.players[0].mark);
  });
});
