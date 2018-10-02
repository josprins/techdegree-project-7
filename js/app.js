// Global variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const keyrow = qwerty.querySelectorAll('.keyrow');
const keyboard = qwerty.getElementsByTagName('button');
const life = document.querySelectorAll('img');
const mainOverlay = document.querySelector('#overlay h2');
const overlay = document.getElementById('overlay');
const startBtn = document.querySelector('.btn__reset');

// Variable for incorrect moves
let missed = 0; // Max 5 misses


// Hide overlay when start button is pressed
startBtn.addEventListener('click', function() {
  overlay.style.display = 'none';
});


// Array of phrases
const phrases = ['i love coding in javascript', 'polar bears are the largest land preditors', 'the darkside of the moon', 'charly chaplin is funny', 'apple laptops are the best laptops']

// get a random phrase
function getRandomPhraseArray(arr) {
    const randomNumber = Math.floor((Math.random() * 4) + 0);
    const randomPhrase = arr[randomNumber];
    return randomPhrase
}

const phraseArray = getRandomPhraseArray(phrases);

// Add phrase to display
function adPhraseToDisplay(){
    let length = phraseArray.length;
    let letters = phraseArray.split('');
    const ul = phrase.firstElementChild;
    
    for (let i = 0; i < length; i++) {
        let li = document.createElement("li");
        li.textContent = letters[i];
        
        if(letters[i] === " " ) {
           li.classList.add('space');
         } else {
           li.classList.add('letter');
         }

        ul.appendChild(li);
       
    }
}

adPhraseToDisplay(phraseArray);

// Event listener for key press
for (let i = 0; i < keyboard.length; i++) {
    keyboard[i].addEventListener('click', function() {
        let keyLetter = keyboard[i].textContent;
        checkLetter(keyLetter);
        keyboard[i].disabled = true;
        checkWin();
    }); 
    
    
}

// Check letter, update keyboard or update lives
function checkLetter(keyLetter) {
    let list = document.querySelectorAll('.letter');
    let correctLetter = false;
    
    for (let i = 0; i < list.length; i++) {
        
        let listLetter = list[i].textContent;
        
        if (listLetter === keyLetter) {
            correctLetter = true;
            list[i].classList.add('show');
            // CSS transistion added for exceed expectations
            list[i].style.transition = 'all 2s';
        } 
    }
    
    if (correctLetter === false) {
        missed += 1;
    } if (missed == 1) {
        life[0].style.display = 'none';
    } if (missed == 2) {
        life[1].style.display = 'none';
    } if (missed == 3) {
        life[2].style.display = 'none';
    } if (missed == 4) {
        life[3].style.display = 'none';
    } if (missed == 5) {
        life[4].style.display = 'none';
    }
    
    return correctLetter;
}

// Check if game is won or lossed and change overlay class for win or lose (exceed expectations)
function checkWin() {
    let show = document.querySelectorAll('.show');
    let letter = document.querySelectorAll('.letter');

    if (letter.length === show.length) {
        
        overlay.style.display = 'flex';
        startBtn.textContent = 'Play Again?';
        mainOverlay.textContent = 'You Win!'
        mainOverlay.classList.add('win');
        
        reset();
        
    } else if (missed === 5) {
        mainOverlay.textContent = 'You Lose!';
        overlay.style.display = 'flex';
        startBtn.textContent = 'Play Again?';
        mainOverlay.classList.add('lose');

        reset();
  }
}

function reset() {

   startBtn.addEventListener('click', () =>{
     window.location = window.location
  });
}

