/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, rollValue;

scores = [0,0];
roundScore = 0; 
activePlayer = 0;
var dice = document.querySelector('.dice');
var player1 = document.querySelector('#name-0');
var player2 = document.querySelector('#name-1');

dice.style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
  rollValue = Math.floor(Math.random() * 6) + 1;
  dice.style.display = 'block'; 
  dice.src = 'dice-' + rollValue + '.png';
  if (rollValue == 1) {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer = swapActivePlayer(activePlayer);
  }
  else { 
    roundScore += rollValue;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function() { 
  scores[activePlayer] += roundScore;
  roundScore = 0;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
  var playerScore = document.querySelector('#score-' + activePlayer);
  playerScore.textContent = scores[activePlayer];
  if (playerScore.textContent >= 100) { 

  }
  activePlayer = swapActivePlayer(activePlayer);
});

function swapActivePlayer(activePlayer) {
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  if (activePlayer == 0) {
    activePlayer = 1; 
  } else { 
    activePlayer = 0; 
  } 
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  return activePlayer; 
}
