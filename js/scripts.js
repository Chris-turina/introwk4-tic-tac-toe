// Game constructor and methods
function Game(players) {
  this.players = players;
  this.board = new Board();
  this.currentPlayer = this.players[0];
}

Game.prototype.passTurn = function() {
  if (this.currentPlayer.id === 0) {
    this.currentPlayer = this.players[1];
  }
  else if (this.currentPlayer.id === 1) {
    this.currentPlayer = this.players[0];
  }
}

Game.prototype.tryMakeMove = function(player, space) {
  if(this.board.tryMarkBox(player, space)) {
    this.passTurn();
    return true;
  }
  else {
    return false;
  }
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
// return true if legal move, else false
Board.prototype.tryMarkBox = function(player, space) {
  var x = space[0];
  var y = space[1];
  if (this.boxes[y][x] === 0) {
    if (player.id === 0) {
      this.boxes[y][x] = 1;
    }
    else if (player.id === 1) {
      this.boxes[y][x] = -1;
    }
    return true;
  }
  else {
    return false;
  }
}

$(document).ready(function() {
  var player1 = new Player(0, "O");
  var player2 = new Player(1, "X");
  var players = [player1, player2];
  var game = new Game(players);

  $(".box").click(function() {
    var x = $(this).attr("xCoordiante");
    var y = $(this).attr("yCoordiante");

    if(game.tryMakeMove(game.currentPlayer, [x, y])) {
      $(this).text(game.currentPlayer.mark);
    }
  });
});
