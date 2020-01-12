/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
TODO LIST:
- Fix errors
*/

var player1 = {
  score: 0,
  roundScore: 0
}

var player2 = {
  score: 0,
  roundScore: 0
}

activePlayer = 1
winnerPlayer = null

function rolleDice () {
  var rolleDice, diceImage
  rolledDice = getRandomInt(1, 6)
  diceImage = document.getElementsByClassName("dice")[0];
  if(diceImage == null) {
    createImgElt()
  }
  diceImage = document.getElementsByClassName("dice")[0];
  diceImage.src = "dice-" + rolledDice + ".png"
  calculateScore(rolledDice)
  if (activePlayer == 1) document.getElementById("current-0").innerHTML = player1.roundScore
  else                   document.getElementById("current-1").innerHTML = player2.roundScore
}

function createImgElt () {
    var img = document.createElement("img");
    img.setAttribute('alt', "Dice");
    img.setAttribute('class', "dice");
    var div_element = document.getElementsByClassName("wrapper clearfix")[0];
    div_element.appendChild(img);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateScore(rolledDice) {
  if(activePlayer == 1){
      if (rolledDice == 1){
                        player1.roundScore = 0
                        hold()
      }
      else              player1.roundScore += rolledDice
  }
  else{
      if (rolledDice == 1){
                        player2.roundScore = 0
                        hold()
      }
      else              player2.roundScore += rolledDice
  }
}
function  hold() {
    if(activePlayer == 1){
      player1.score += player1.roundScore
      player1.roundScore = 0
      document.getElementById("current-0").innerHTML = 0
      document.getElementById("score-0").innerHTML = player1.score
    }
    else {
      player2.score += player2.roundScore
      player2.roundScore = 0
      document.getElementById("current-1").innerHTML = 0
      document.getElementById("score-1").innerHTML = player2.score
    }
    checkWinner()
  }

  function checkWinner() {
    if(player1.score >= 100 || player2.score >= 100) {
      //Remove active player
      var elems = document.querySelectorAll(".active");
      [].forEach.call(elems, function(el) {
        el.classList.remove("active");
      });

      //Remove dice image
      var img = document.getElementsByClassName('dice')[0];

      //Disabled buttons hold and roll
      document.getElementsByClassName('btn-roll')[0].disabled = true;
      document.getElementsByClassName('btn-hold')[0].disabled = true;

      img.parentNode.removeChild(img);
      if(player1.score >= 100){
        winnerPlayer = 1
        document.getElementById("name-0").innerHTML = "Winner!"
      }
      else if (player2.score >= 100) {
        winnerPlayer = 2
        document.getElementById("name-1").innerHTML = "Winner!"
      }
    }
    else changeActivePlayer()
  }

  function changeActivePlayer() {
    //Change acive player
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });

    //Remove dice image
    var img = document.getElementsByClassName('dice')[0];
    if(img) img.parentNode.removeChild(img);
    if(activePlayer == 1)  {
      activePlayer = 2
      var d = document.getElementsByClassName('player-1-panel')[0];
      d.className += " active";
    }
    else {
      activePlayer = 1
      var d = document.getElementsByClassName('player-0-panel')[0];
      d.className += " active";
    }
  }

  function startNewGame() {
    player1 = {
      score: 0,
      roundScore: 0
    }
    player2 = {
      score: 0,
      roundScore: 0
    }
    winnerPlayer = null
    activePlayer = 1
    resetView()
}
  function resetView () {

    //Reset score of player1
    document.getElementById("score-0").innerHTML   = "0";
    document.getElementById("current-0").innerHTML = "0";

    //Reset score of player2
    document.getElementById("score-1").innerHTML   = "0";
    document.getElementById("current-1").innerHTML = "0";

    //Remove active player
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
      el.classList.remove("active");
    });

    //Make player1 as the active player
    var d = document.getElementsByClassName('player-0-panel')[0];
    d.className += " active";
    activePlayer = 1

    //Reset names of players
    document.getElementById("name-0").innerHTML = "Player1"
    document.getElementById("name-1").innerHTML = "Player2"

    winnerPlayer = null

    //Remove dice image
    var img = document.getElementsByClassName('dice')[0];
    if(img){
        img.parentNode.removeChild(img);
    }

    //enable buttons Hold and roll
    document.getElementsByClassName('btn-roll')[0].disabled = false;
    document.getElementsByClassName('btn-hold')[0].disabled = false;
  }
