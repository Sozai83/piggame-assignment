
var scores, roundScores, activePlayer,gamePlaying, count, results, num;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying){
		//1. Random number & store number to result array
		var dice = Math.floor(Math.random() * 6) + 1;
		//2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice +('.png');//change img source

		//3. Update the round score IF the rolled number was NOT a 1
		if (dice !== 1){
			//Add score & count
			roundScore += dice;
			results[count] = dice;
			count ++;
			//if the player got two 6 in a row
			if(results[count-2] === 6 && dice === 6){
				document.querySelector('#score-'+activePlayer).textContent = 0;
				scores[activePlayer] = 0;
				//Next player
				nextPlayer();
			}else{			
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			}
		}else{
			//Next player
			nextPlayer();
		}
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		//Add current score to Grobal scotre
		scores[activePlayer] += roundScore;


		//Update the User Interface(UI)
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		//check if player won the game
		if(scores[activePlayer] >= num){
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		}else{
		//Next Player
			nextPlayer();
		}
	}
});


document.querySelector('.btn-change').addEventListener('click',function(){
	num = prompt("Please enter number", "100");
	document.getElementById('goal').textContent = num;
});

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1: activePlayer = 0; //terminate operator
	roundScore = 0;
	count = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
	results = [];
}

document.querySelector('.btn-new').addEventListener('click',function(){
	init();
});

function init(){

scores = [0, 0];
roundScore = 0;
activePlayer = 0;
gamePlaying = true;
count = 0;
results = new Array();
num = 100;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');

}

/*
OK 1. rolls two 6 in a row : losses ENTIRE score and its next players turn after that
-document.getElementById('score-' + activePlayer).textContent = '0';
OK 2.Add an Input field to change the winning score
(value property)
3.Add another dice to the game / loose his score if one of them is 1
*/






