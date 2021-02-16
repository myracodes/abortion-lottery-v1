// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');

// canvas.width = innerWidth;
// canvas.height = innerHeight;

class Player {
    // list all the properties my player has
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.points = 500;
        this.country;
        this.wealth;
        this.weeks;
    }
}

const playerCursor = document.getElementById('player');
let x = playerCursor.offsetLeft;
let y = playerCursor.offsetTop;
const gameBoard = document.getElementById('game-board');
let gameBoardWidth = gameBoard.style.width;
let playerImage = document.getElementById('player-image');

const player = new Player(x, y);

const boxes = [
    ["plane", "passport", "money" /*, "vacuum", "planned parenthood", "abortion pill", "education"*/ ],
    ["PCOS", "hanger", "Marty" /*, "CIVITAS", "desert", "conscience clause", "ivg-info"*/ ]
];

// note : harmoniser les points et rajouter des pays
//illégal= -200pts // sous conditions= 0pt // droit récent= 50pts // droit ancré= 100pts // nb de semaines plus long= 150pts
const countries = [{
        name: "Thaïland, +50pts",
        points: 50
    },
    {
        name: "Salvador, -200pts", // illegal
        points: -200
    },
    {
        name: "Sri Lanka, +0pt",
        points: 0
    },
    {
        name: "Poland, -100pts",
        points: -100
    },
    {
        name: "New Zealand, +0pt",
        points: 0
    },
    {
        name: "Sénégal, -200pts", // illegal
        points: -200
    },
    {
        name: "Sweden, +100pts", // til 18 weeks
        points: 100
    },
    {
        name: "Tunisia, +0pt", // sous conditions restrictives
        points: 0
    },
    {
        name: "Ireland, +50pts", // seulement depuis 2018
        points: 50
    },
    {
        name: "Honduras, -200pts", // illegal en ttes circonstances
        points: -200
    }
];
const prosperity = [{
        wealth: "poor, -100pts",
        points: -100
    },
    {
        wealth: "average, -50pts",
        points: -50
    },
    {
        wealth: "wealthy, +100pts",
        points: 100
    },
    {
        wealth: "very rich, +150pts",
        points: 150
    }
];
const numberOfWeeks = [{
        weeks: "3 weeks, 50pts",
        points: 50
    },
    {
        weeks: "6 weeks, +0pt",
        points: 0
    },
    {
        weeks: "9 weeks, -50pts",
        points: -50
    },
    {
        weeks: "12 weeks, -100pts",
        points: -100
    },
    {
        weeks: "15 weeks, -150pts",
        points: -150
    }
];


// ---
// BEFORE THE GAME STARTS
// ---


let pointsCounter = document.getElementById('points-counter');
let startButton = document.getElementById('start-button');
let slotMachineButton = document.getElementById('slot-machine-button');
let slotMachine = document.getElementById('slot-machine');
let slotMachineContent = document.getElementById('slot-machine-content');
let countriesBlock = document.getElementById('countries-block');
let prosperityBlock = document.getElementById('prosperity-block');
let numberOfWeeksBlock = document.getElementById('numberOfWeeks-block');

player.points.innerHTML = this.points;

slotMachineButton.addEventListener('click', () => {
    launchesSlotMachine();
});

startButton.addEventListener('click', () => {
    startGame();
})

// cacher le boulton slot machine après l'avoir utilisé
function launchesSlotMachine() {
    // ajouter timeout aux 3 fonctions generateXX
    generatesCountry();
    generatesProsperity();
    generatesWeeks();
    startButton.classList.add('is-visible');
    startButton.classList.remove('is-hidden');
    slotMachineButton.classList.add('is-hidden');
    slotMachineButton.classList.remove('is-visible');
    pointsCounter.innerHTML = player.points;
}

function generatesCountry() {
    // x generates points in the beginning depending on your country
    // x adds points to this.points
    player.country = countries[Math.floor(Math.random() * (countries.length - 1))];
    player.points += player.country.points;
    countriesBlock.innerHTML = 'Player is living in ' + player.country.name;
}

function generatesProsperity() {
    // x generates points in the beginning depending on your Prosperity
    // x adds points to this.points
    player.wealth = prosperity[Math.floor(Math.random() * (prosperity.length - 1))];
    player.points += player.wealth.points;
    prosperityBlock.innerHTML = 'Player\'s wealth is ' + player.wealth.wealth;
}

function generatesWeeks() {
    // x generates points depending on the number of weeks of pregnancy
    // x adds points to this.points
    player.weeks = numberOfWeeks[Math.floor(Math.random() * (numberOfWeeks.length - 1))];
    player.points += player.weeks.points;
    numberOfWeeksBlock.innerHTML = 'Player has been pregnant for ' + player.weeks.weeks;
}

function startGame() {
    // x launches the game
    // x only available after generatesCountry/Prosperity/Weeks have been used
    // x launches the eventListener
    // appelle playerMoves 
    // note : left key = 37 // right key = 39
    slotMachine.classList.add('is-hidden');
    slotMachine.classList.remove('is-visible');
    gameBoard.classList.remove('is-hidden');
    gameBoard.classList.add('is-visible');

    document.addEventListener("keydown", event => {
        console.log(playerCursor);
        if (event.keyCode === 37 && player.x > 5) {
            playerMovesLeft();
        } else if (event.keyCode === 39 && player.x < gameBoard.clientWidth - 5) {
            playerMovesRight();
        }
    });
    // removes start game button (is-hidden class)
    startButton.classList.add('is-hidden');
    startButton.classList.remove('is-visible')
}

// ---
// DURING THE GAME
// ---

function playerMovesRight() {
    player.x += 5;
    playerCursor.offsetLeft += 5;
    playerImage.offsetLeft +=5 ;
    console.log('appuyééé droite');
}

function playerMovesLeft() {
    // player.x -= 5;
    player.clientLeft -= 5;
    playerCursor.offsetLeft -= 5;
    console.log('appuyééé gauche');
}

/** prend une string en entrée et retourne un nb
 **/
function stringToNumber(string) {
    let stringWithoutPx = string.replace('px', '');
    return parseInt(stringWithoutPx);

    // let currentPosition = this.player.x;
    // let updatedPosition;

}
/**
 *  generates boxes, either bonus or malus
 *  use setinterval (+clearInterval?) et Math.random to generate on a random basis (cf cours W2D3)
 *  calls two other functions? generateBonus and generatemalus? Or works on its own? 
 *  va d'abord générer un nb aléatoire entre 0 et 1 pour choisir dans quel array il va choisir (bonus ou malus array)
 *  puis va générer un nb aléatoire entre 0 et [nb d'éléments dans l'array bonus ou malus] pour choisir quel bonus/malus est généré
 *  generates boxes at y=0 and x = random
 *  stops when isGameFinished returns true
 */
function generatesBoxes() {

}

function makesBoxesGoDown() {
    // makes the boxes go down on the screen towards the player
}

function removesBoxes() {
    // checks the position and state of boxes
    // if box y = 0 ---> removes box from screen
    // if collision ---> removes box from screen
}

function detectsCollision() {
    // detects collision between the Player and the boxes
    // calls updatesPoints
    //calls isGameFinished
}

function updatesPoints() {
    // if collision with a bonus, adds points to this.points
    // if collision with a malus, withdraws points from this.points
    // displays updated points on the screen
}

function isGameFinished() {
    // after each collision, checks if points <= 0 ------ if so, TRUE = GAME OVER
    // after each collision, checks if points >= 1000 ------ if so, TRUE = YOU WON
    // after each collision, if none of the above are true, return false
    // returns boolean
    // if TRUE: calls endGame()
}

function soundEffect() {
    // if nothing happens --> plays background music
    // if collision with a bonus --> bonus sound
    // if collision with a malus --> malus sound
    // if game over --> game over sound
    // if game won --> congrats sound
}




// ---
// END OF THE GAME
// ---

function endGame() {
    // updates background music
    // updates page with either WIN or LOSE text with information about access to vip
    // displays thank you message and links (github)
}