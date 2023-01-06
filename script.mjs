import { wordList } from "./wordList.mjs"; 
let underScore;

let secretWord = '';
let lives = 6;
let livesElement;
let usedLetters = [];
let keyClicked = false;
let gameDone = false;
let wrongLetter = []; 

// this function draws the keyboard
function drawKeyboard() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const kbd = document.querySelector('#keyboard');

    for (let i = 0; i < alphabet.length; i++) {
        const letterButton = document.createElement('button');
        letterButton.textContent = alphabet[i];
        letterButton.addEventListener('click', handleClick);
        kbd.append(letterButton);
        letterButton.id = alphabet[i];
        letterButton.classList.add("letterKey");
    }
}

//this function selects the random word 
function selectRandom() {
    const randomNumber = Math.floor(Math.random() * wordList.length);
    secretWord = wordList[randomNumber].word.toUpperCase();
    console.log(secretWord);
}


function handleClick(event) {
    const letter = event.target.textContent;
    if (lives === 0) {
        console.log('Game Over!');
    }
    else {
        if (letterChecker(letter) === true) {
            // guess was correct
            updateWord(letter);
        } else {
            // guess was wrong
            lives -= 1;
            // displayHangman();
            livesElement.textContent = 'Remaining Lives: ' + lives;
            displayHangman();
            addWrongLetter(letter);
            if (lives === 0) {
                looseGame();
            }
        }
        if (!usedLetters.includes(letter)) {
            usedLetters.push(letter);
        }
        event.target.disabled = true;
    }
}

function updateWord(letter) {
    const underScoreList = underScore.split('');
    for (let i = 0; i < secretWord.length; i++) {
        if (letter === secretWord.split('')[i]) {
            underScoreList[i] = letter;
            const hiddenWord = document.querySelector('#secretWord');
            hiddenWord.textContent = underScoreList.join('');
            underScore = underScoreList.join('');
        }
    }
    checkForWin();
}

function looseGame() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const end = document.querySelector('#end');
    end.textContent = 'Game Over the word was ' + secretWord;
    const letterKeys = document.querySelectorAll(".letterKey");

    for (const k of letterKeys) {
        k.disabled = true;
    }
    const hint = document.querySelector('#hint');
    hint.disabled = true;
    gameDone = true;

    for (const letter of alphabet) {
        const foo = '#' + letter;
        const button = document.querySelector(foo);
        button.disabled = true;
        const hint = document.querySelector('#hint');
            hint.disabled = true;
    }
}

function checkForWin() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (underScore === secretWord) {
        console.log('You won!');
        const hint = document.querySelector('#hint');
        hint.disabled = true;
        const keyboard = document.querySelector('#keyboard');
        keyboard.disabled = true;
        const end = document.querySelector('#end');
        end.textContent = 'You won the word was ' + secretWord;
        gameDone = true;
        for (const letter of alphabet) {
            const foo = '#' + letter;
            const button = document.querySelector(foo);
            button.disabled = true;
            const hint = document.querySelector('#hint');
                hint.disabled = true;
        }
    }
}

function addWrongLetter(letter) {
    const wrongGuess = document.querySelector('#wrongLetter');
    if (lives !== 0) {
        wrongLetter.push(letter);
    } else {
        wrongLetter.length = 0;
    }
    wrongGuess.textContent = 'Wrong Letters: ' + wrongLetter;
}

function checkUsedLetters(e) {
    for (let i = 0; i < usedLetters.length; i++) {
        if (usedLetters[i] === e) {
            keyClicked = true;
        }
    }
}

function letterChecker(letter) {
    for (let i = 0; i < secretWord.length; i++) {
        const element = secretWord[i];
        if (letter === element) {
            return true;
        }
    } return false;
}

//this is the creation of the word but in underscore form
function drawLines() {
    underScore = '_';
    const hiddenWord = document.querySelector('#secretWord');

    for (let i = 1; i < secretWord.length; i++) {
        underScore = underScore + '_';
    }

    hiddenWord.textContent = underScore.split('').join('');
}

//shows the remaining lives on the page
function showLives() {
    livesElement = document.querySelector('#showLives');
    livesElement.textContent = 'Remaining Lives: ' + lives;
}

//this displays the hangman images on the page
function displayHangman() {
    const imgList = ['images/image6.png', 'images/image5.png', 'images/image4.png', 'images/image3.png', 'images/image2.png', 'images/image1.png'];
    const hangman = document.querySelector('#hangman');
    for (let i = 0; i < imgList.length; i++) {
        if (i === lives) {
            hangman.src = imgList[i];
        }
    }
}

function wordChecker(underScore) {
    const word = document.querySelector('#secretWord');
    if (word === underScore) {
        window.prompt('You guessed correctly');
    }
}

function hintMaker() {
    const hint = document.querySelector("#mainHint");
    const targetWord = secretWord.toLowerCase();
   

    for (let i = 0; i < wordList.length; i++) {
        if (targetWord === wordList[i].word) {
           hint.textContent = wordList[i].hint;
        }
    }
}

function keyboardPress(e) {
    if (lives === 0) {
        return false;
    }
    const letterInput = e.key.toUpperCase();
    checkUsedLetters(letterInput);
    if (keyClicked === true) {
        keyClicked === false
        return false;
    }
    usedLetters.push(letterInput);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letterValue = false;
    for (const letter of alphabet) { 
        if (letterInput === letter) {
            letterValue = true;   
        }
    }
    console.log(gameDone);
    if (gameDone === true) {
        return false;
    }
    if (secretWord.split('').includes(letterInput) && letterValue === true) {
        console.log(letterInput);
      const dashList = underScore.split('');
      for (let i = 0; i < secretWord.length; i++) {
        if (letterInput === secretWord[i]) {
          dashList[i] = letterInput;
          const foo = document.querySelector('#secretWord');
          foo.textContent = dashList.join('');
          underScore = foo.textContent;
        }
      }
    } else {
        if (letterValue === false) {
            return false;
        }
        lives -= 1;
        livesElement.textContent = 'Remaining Lives: ' + lives;
        addWrongLetter(letterInput)
        displayHangman();
        if (lives === 0) {
            looseGame();
            return false;
        }
    }
    if (letterValue === true) {
        const keyInput = '#' + letterInput;
    const key = document.querySelector(keyInput);
    key.disabled = true;
    }
    checkForWin();
  }

function restart() {
    secretWord = '';
    lives = 6;
    livesElement;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const hiddenWord = document.querySelector('#secretWord');
    const livesCounter = document.querySelector('#showLives');
    const mainHint = document.querySelector('#mainHint');
    const end = document.querySelector('#end');
    const letter = document.querySelector('#wrongLetter');
    const hangman = document.querySelector('#hangman');

    hiddenWord.textContent = '';
    livesCounter.textContent = '';
    mainHint.textContent = '';
    end.textContent = '';
    letter.textContent = '';
    // hangman.textContent = '';

    for (const letter of alphabet) {
        const foo = '#' + letter;
        const button = document.querySelector(foo);
        button.disabled = false;
        const hint = document.querySelector('#hint');
            hint.disabled = false;
    }

    usedLetters = [];
    selectRandom();
    drawLines();
    showLives();
    wordChecker();
}


function init() {
    drawKeyboard();
    selectRandom();
    drawLines();
    showLives();
    wordChecker();
    
    const hintButton = document.querySelector("#hint");
    hintButton.addEventListener('click', hintMaker);

    const playAgain = document.querySelector("#reset");
    playAgain.addEventListener('click', restart);
    document.addEventListener('keydown', keyboardPress);
}

window.addEventListener('load', init);


