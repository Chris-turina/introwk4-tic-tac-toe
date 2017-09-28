// Game constructor and methods
function Game(players) {
  this.players = players;
  this.board = new Board();
  this.currentPlayer = this.players[0];
  this.allowPlay = true;
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
  if(this.board.tryMarkBox(player, space) && this.allowPlay === true) {
    this.passTurn();
    return true;
  }
  else {
    return false;
  }
}

Game.prototype.checkResult = function() {
  if (this.board.checkForWin() === "player0win") {
    this.allowPlay = false;
    return "player0win";
  }
  if (this.board.checkForWin() === "player1win") {
    this.allowPlay = false;
    return "player1win";
  }
  if (this.board.moveCounter === 9) {
    this.allowPlay = false;
    return "draw";
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
  this.moveCounter = 0;
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
    this.moveCounter++;
    return true;
  }
  else {
    return false;
  }
}

// return "player0 win" if player 0 wins
// return "player1 win" if player 1 wins
// return false otherwise
Board.prototype.checkForWin = function() {

  var diagonal1 = this.boxes[0][0] + this.boxes[1][1] + this.boxes[2][2];
  var diagonal2 = this.boxes[0][2] + this.boxes[1][1] + this.boxes[2][0];

  for (var i = 0; i < 3; i++) {
    var colSum = 0;
    var rowSum = 0;
    for (var j = 0; j < 3; j++) {
      colSum += this.boxes[j][i];
      rowSum += this.boxes[i][j];
    }
    if (rowSum === 3 || colSum === 3 || diagonal1 === 3 || diagonal2 === 3) {
      return "player0win";
    }
    if (rowSum === -3 || colSum === -3 || diagonal1 === -3 || diagonal2 === -3) {
      return "player1win";
    }
  }
  return false;
}

$(document).ready(function() {
  $('.modal').modal();
  var player1 = new Player(0, "O");
  var player2 = new Player(1, "X");
  var players = [player1, player2];
  var game = new Game(players);

  $(".box").hover(function() {
    var x = $(this).attr("xCoordiante");
    var y = $(this).attr("yCoordiante");
    if(game.board.boxes[y][x] === 0) {
      if (game.currentPlayer.id === 0) {
        $(this).addClass("waves-effect waves-teal");
      }
      if (game.currentPlayer.id === 1) {
        $(this).addClass("waves-effect waves-purple");
      }
    }

  }, function() {
      var x = $(this).attr("xCoordiante");
      var y = $(this).attr("yCoordiante");
      if(game.board.boxes[y][x] === 0) {
        $(this).removeClass("waves-effect waves-teal");
        $(this).removeClass("waves-effect waves-purple");
      }
    });

  $(".box").click(function() {
    var x = $(this).attr("xCoordiante");
    var y = $(this).attr("yCoordiante");

    if(game.tryMakeMove(game.currentPlayer, [x, y])) {
      $(this).append("<p>" + game.currentPlayer.mark + "</p>");

      if (game.checkResult() === "player0win") {
        $("#winning-player").text("Player 1 Wins!")
        $('#modal1').modal("open");
      }
      if (game.checkResult() === "player1win") {
        $("#winning-player").text("Player 2 Wins!")
        $('#modal1').modal('open');
      }
      if (game.checkResult() === "draw") {
        $("#winning-player").text("It is a Draw Play Again to Settle the Score")
        $('#modal1').modal("open");
      }
    }
  });
  $(".re-play").click(function() {
    location.reload();
  });
});
