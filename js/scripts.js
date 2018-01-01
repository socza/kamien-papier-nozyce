var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

newGameBtn.addEventListener('click', newGame);

pickRock.addEventListener('click', function() { playerPick('Kamień'); });
pickPaper.addEventListener('click', function() { playerPick('Papier'); });
pickScissors.addEventListener('click', function() { playerPick('Nożyce'); });

function setGameElements() {
    
    switch(gameState) {
    
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
        break;
    
        case 'ended':
            newGameBtn.innerText = 'Chcesz zagrać jeszcze raz?';
            playerPickElem.innerHTML = 'Wybór gracza';
            computerPickElem.innerHTML = 'Wybór komputera';
            playerResultElem.innerHTML = 'Wynik gracza';
            computerResultElem.innerHTML = 'Wynik komputera';
        
        case 'notStarted':
        
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }

}

setGameElements();

function newGame() {

  	player.name = prompt('Proszę wpisać swoje imię', '');
  	
    while (player.name == false) {
        alert('Nie wprowadzono imienia !');
        player.name = prompt('Proszę wpisać swoje imię', '');
    }
    
    if (player.name) {
        player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();

   		playerNameElem.innerHTML = player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
   	    setGamePoints();
    
    }

}

function getComputerPick() {

    var possiblePicks = ['Kamień', 'Papier', 'Nożyce'];
    return possiblePicks[Math.floor(Math.random()*3)];

}

function playerPick(playerPick) {

    console.log(player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) + ' wybrał/a: ' + playerPick);
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = 'wybrał: ' + playerPick;
    computerPickElem.innerHTML = 'wybrał: ' + computerPick;

    checkRoundWinner(playerPick, computerPick);

}

function setGamePoints() {

    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;

}

function setGameEnd() {
    
    if (computer.score == 10) {
        alert('Komputer wygrał grę ' + computer.score + ' : ' + player.score + ' !!!');
        gameState = 'ended';
        setGameElements();
    }
    
    if (player.score == 10) {
        alert(player.name.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();}) + ' wygrywa grę ' + player.score + ' : ' + computer.score + ' !!!');
        gameState = 'ended';
        setGameElements();
    }

}

function checkRoundWinner(playerPick, computerPick) {
  	
  	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  	var winnerIs = 'player';

  	if (playerPick == computerPick) {
        winnerIs = 'noone';
        playerResultElem.innerHTML = "\<span class=\"label label-info\"\>Remis";
        computerResultElem.innerHTML = "\<span class=\"label label-info\"\>Remis";

    } else if (
        (computerPick == 'Kamień' &&  playerPick == 'Nożyce') ||
        (computerPick == 'Nożyce' &&  playerPick == 'Papier') ||
        (computerPick == 'Papier' &&  playerPick == 'Kamień')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "\<span class=\"label label-success\"\>Wygrana !!!";
        computerResultElem.innerHTML = "\<span class=\"label label-danger\"\>Przegrana !!!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "\<span class=\"label label-success\"\>Wygrana !!!";
        playerResultElem.innerHTML = "\<span class=\"label label-danger\"\>Przegrana !!!";
        computer.score++;
    }

    setGamePoints();
    setGameEnd();

}
