/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, rollValue;
var dice = document.querySelector('.dice');

initializeGame();

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
  if (scores[activePlayer] >= 100) { 
    document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
    this.style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';
    return;
  }
  activePlayer = swapActivePlayer(activePlayer);
});

document.querySelector('.btn-new').addEventListener('click', function() { 
  initializeGame();
});

function initializeGame() { 
  scores = [0,0];
  roundScore = 0; 
  activePlayer = 0;
  document.querySelector('#current-0').textContent = '0';
  document.querySelector('#current-1').textContent = '0';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('#score-0').textContent = '0';
  document.querySelector('#score-1').textContent = '0';
  dice.style.display = 'none';
}

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
