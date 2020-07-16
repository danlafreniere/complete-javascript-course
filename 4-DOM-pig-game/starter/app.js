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
document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;


document.querySelector('.btn-roll').addEventListener('click', function() {
  rollValue = Math.floor(Math.random() * 6) + 1;
  if (rollValue == 1) {
    // everything dies.
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    activePlayer = swapActivePlayer(activePlayer);
  }
  else {
    roundScore += rollValue;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }
})

function swapActivePlayer(activePlayer) {
  if (activePlayer == 0) {
    return 1;
  }
  return 0;
}
