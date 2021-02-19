/**
 *  @author Myriam Mira
 */
class Player {
    constructor(x) {
        this.x = x;
        this.points = 500;
        this.country;
        this.wealth;
        this.weeks;
    }
}

let incrementedId = 0;
const playerCursor = document.getElementById('player');
let x = playerCursor.style.left;
let playerPosition = 0;
const gameBoard = document.getElementById('game-board');
let wonDiv = document.getElementById('won');
let lostDiv = document.getElementById('lost');
const resetButton = document.getElementById('reset-button');

// getElements is better here because it stays up to date (querySelectorAll would require to be udpated)
let allBoxes = document.getElementsByClassName('box');

const player = new Player(x);

const bonuses = [{
        name: "plane",
        class: 'bonus',
        htmlImg: `<img src="./img/plane-emoji.png" alt="plane-emoji" class="bonus plane" data-points='${50}'>`
    },
    {
        name: "passport",
        class: 'bonus',
        htmlImg: `<img src="./img/passport-emoji.png" alt="passport-emoji" class="bonus passport" data-points='${20}'>`
    },
    {
        name: "money",
        class: 'bonus',
        htmlImg: `<img src="./img/money-emoji.png" alt="money-emoji" class="bonus money" data-points='${30}'>`
    }
    /* "vacuum", "planned parenthood", "abortion pill", "education"*/
];
const maluses = [{
        name: "PCOS",
        class: 'malus',
        htmlImg: `<img src="./img/pcos-emoji.png" alt="pcos-emoji" class="malus pcos" data-points='${-10}'>`
    },
    {
        name: "Trump",
        class: 'malus',
        htmlImg: `<img src="./img/trump-emoji.png" alt="trump-emoji" class="malus trump" data-points='${-50}'>`
    },
    {
        name: "hanger",
        class: 'malus',
        htmlImg: `<img src="./img/hanger-emoji.png" alt="hanger-emoji" class="malus hanger" data-points='${-200}'>`
    },
    {
        name: "Francis",
        class: "malus",
        htmlImg: `<img src="./img/pope-francis-emoji.png" alt="pope-francis" class="malus francis" data-points='${-40}'>`
    }
    /*, "CIVITAS", "desert", "conscience clause", "ivg-info"*/
];


//illégal= -200pts // sous conditions= -50pts // droit récent= +0pt // droit ancré= 100pts // nb de semaines plus long= 150pts
const countries = [{
        name: "Afghanistan, -100pt", // toléré si danger pour la vie de la mère
        points: -100
    }, {
        name: "Argentina, +0pt", // recently legalized
        points: 0
    },
    {
        name: "Chili, -50pts", // toléré si danger pour la vie de la mère / viol / non-viabilité du foetus
        points: -50
    },
    {
        name: "Congo, -200pts", // illegal en ttes circonstances
        points: -200
    },
    {
        name: "Honduras, -200pts", // illegal en ttes circonstances
        points: -200
    },
    {
        name: "Ireland, +0pt", // légal seulement depuis 2018
        points: 0
    },
    {
        name: "Laos, -200pts", // illegal
        points: -200
    },
    {
        name: "Malte, -200pts", // illegal en ttes circonstances 18 mois à 3 ans de prison. Seul pays UE prohibant totalement ivg
        points: -200
    },
    {
        name: "New Zealand, +0pt",
        points: 0
    },
    {
        name: "Poland, -100pts", // récemment menacé
        points: -100
    },
    {
        name: "Salvador, -200pts", // illegal en ttes circonstances (homicide aggravé - 30 à 50 ans de réclusion crim, prison pr fausses couches)
        points: -200
    },
    {
        name: "Sénégal, -200pts", // illegal
        points: -200
    },
    {
        name: "Sri Lanka, -50pt", // toléré si danger pour la vie de la mère
        points: -50
    },
    {
        name: "Sweden, +100pts", // til 18 weeks
        points: 100
    },
    {
        name: "Thaïland, +50pts",
        points: 50
    },
    {
        name: "Tunisia, +0pt", // sous conditions restrictives
        points: 0
    },
];
const prosperity = [{
        wealth: "Poor, -100pts",
        points: -100
    },
    {
        wealth: "Average wealth, -50pts",
        points: -50
    },
    {
        wealth: "Wealthy, +100pts",
        points: 100
    },
    {
        wealth: "Very rich, +150pts",
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

let firstGame = true;
let pointsCounter = document.getElementById('points-counter');

let startButton = document.getElementById('start-button');

// slot machine buttons & content
let slotMachineButton = document.getElementById('slot-machine-button');
let slotMachine = document.getElementById('slot-machine-image');
let slotMachineContent = document.getElementById('slot-machine-content');
// slot machine blocks
let countriesBlock = document.getElementById('countries-block');
let prosperityBlock = document.getElementById('prosperity-block');
let numberOfWeeksBlock = document.getElementById('numberOfWeeks-block');

pointsCounter.innerHTML = player.points;

let isGameFinished = false;

slotMachineButton.addEventListener('click', () => {
    launchesSlotMachine();
});

startButton.addEventListener('click', () => {
    startGame();
});

/**
 * x Generates a random country, prosperity, and number of weeks
 * updates the points counter with the total
 */
function launchesSlotMachine() {
    generatesCountry();
    generatesProsperity();
    generatesWeeks();
    startButton.classList.add('is-visible');
    startButton.classList.remove('is-hidden');
    slotMachineButton.classList.add('is-hidden');
    slotMachineButton.classList.remove('is-visible');
    pointsCounter.innerHTML = player.points;
}

/**
 * x generates points in the beginning depending on your country
 * x adds points to player.points
 */
function generatesCountry() {
    player.country = countries[Math.floor(Math.random() * (countries.length - 1))];
    player.points += player.country.points;
    countriesBlock.innerHTML = 'Living in ' + player.country.name;
}
/**
 * x generates points in the beginning depending on your Prosperity
 * x adds points to player.points
 */
function generatesProsperity() {
    player.wealth = prosperity[Math.floor(Math.random() * (prosperity.length - 1))];
    player.points += player.wealth.points;
    prosperityBlock.innerHTML = player.wealth.wealth;
}
/**
 * x generates points depending on the number of weeks of pregnancy
 * x adds points to player.points
 */
function generatesWeeks() {
    player.weeks = numberOfWeeks[Math.floor(Math.random() * (numberOfWeeks.length - 1))];
    player.points += player.weeks.points;
    numberOfWeeksBlock.innerHTML = 'Pregnant for ' + player.weeks.weeks;
}

/**
 * x is called by a click on the start button
 * x is only available after launchesSlotMachine has been called
 * x launches the eventListener on the keypress
 * x calls playerMoves 
 * x note : left key = 37 // right key = 39
 */
function startGame() {
    slotMachine.classList.add('is-hidden');
    slotMachine.classList.remove('is-visible');
    gameBoard.classList.remove('is-hidden');
    gameBoard.classList.add('is-visible');
    slotMachineContent.classList.add('is-hidden');
    slotMachineContent.classList.remove('is-visible');
    
    isGameFinished = false;
    // replace keyCode by the most recent feature -- KeyboardEvent.code maybe

    startButton.classList.add('is-hidden');
    startButton.classList.remove('is-visible');
    if (firstGame) {
        document.addEventListener("keydown", event => {
            if (event.keyCode === 37) {
                playerMovesLeft();
            } else if (event.keyCode === 39) {
                playerMovesRight();
            }
            detectCollisionAll();
        });
        setInterval(() => {
            generatesBoxes();
        }, 500);
    }
    firstGame = false;
}

// ---
// DURING THE GAME
// ---

/**
 * x Moves player 5px to the right when right arrow on the keyboard is pressed
 */
function playerMovesRight() {
    if (playerPosition < 345) {
        playerPosition += 11;
        playerCursor.style.left = playerPosition + 'px';
    }
}

/**
 * x Moves player 5px to the left when left arrow on the keyboard is pressed
 */
function playerMovesLeft() {
    if (playerPosition > 0) {
        playerPosition -= 11;
        playerCursor.style.left = playerPosition + 'px';
    }
}

/**
 * x prend une string en entrée et retourne un nb
 * finalement j'ai trouvé une autre méthode plus simple pour faire ça donc not used
 */
function stringToNumber(string) {
    let stringWithoutPx = string.replace('px', '');
    return parseInt(stringWithoutPx);
}


/**
 *  generates boxes (either bonus or malus) every 1 sec;
 *  use setinterval (+clearInterval?) et Math.random to generate on a random basis (cf cours W2D3)
 *  calls two other functions? generateBonus and generatemalus? Or works on its own? 
 *  va d'abord générer un nb aléatoire entre 0 et 1 pour choisir dans quel array il va choisir (bonus ou malus array)
 *  puis va générer un nb aléatoire entre 0 et [nb d'éléments dans l'array bonus ou malus] pour choisir quel bonus/malus est généré
 *  generates boxes at y=0 and x = random
 *  calls makeBoxesGoDown() for each box
 *  x stops when checkIfGameIsFinished returns true
 * if box class contains bonus or malus, alors appliquer un style ?
 */
function generatesBoxes() {
    // ajouter feature pour vérifier qu'il n'y a pas déjà une boîte à cet endroit ?
    if (isGameFinished === false) {
        let bonusOrMalus = Math.random();
        let randomPosition = generateRandomPosition();
        if (bonusOrMalus < 0.5) {
            generateBonus(randomPosition);
        } else {
            generateMalus(randomPosition);
        }
    }
}

/**
 * is called by generateBoxes()
 * x calls generateRandomPosition()
 * creates a bonus picked randomly among bonus array
 * x takes a randomPosition as an argument
 * x adds a span to innerHTML
 */
function generateBonus(position) {
    incrementedId += 1;
    let randomBonusIndex = Math.floor(Math.random() * (bonuses.length));
    let randomBonus = bonuses[randomBonusIndex];
    let newBonus = `<div class="box bonus" id="${incrementedId}" style="top: 0; left: ${position}px;">${randomBonus.htmlImg}</div>`;
    let div = document.createElement('div');
    div.innerHTML += newBonus;
    gameBoard.appendChild(div);
    let box = document.getElementById(incrementedId);
    makeBoxesGoDown(box);
}

/**
 * is called by generateBoxes()
 * x calls generateRandomPosition()
 * creates a malus picked randomly among malus array
 * x takes a randomPosition as an argument
 * x adds a span to innerHTML
 */
function generateMalus(position) {
    incrementedId += 1;
    let randomMalusIndex = Math.floor(Math.random() * (maluses.length));
    let randomMalus = maluses[randomMalusIndex];
    let newMalus = `<div class="box malus" id="${incrementedId}" style="top: 0; left: ${position}px;">${randomMalus.htmlImg}</div>`;
    let div = document.createElement('div');
    div.innerHTML += newMalus;
    gameBoard.appendChild(div);

    let box = document.getElementById(incrementedId);
    makeBoxesGoDown(box);
}

function generateRandomPosition() {
    let randomPosition = Math.floor(Math.random() * 345);
    return randomPosition;
}

/**
 * makes the boxes move down on the screen towards the player
 * box.position sur axe vertical est comprise entre 0 et 500
 * quand box.position(y) = 500 -> la supprimer/cacher/faire disparaître 
 * toutes les 0,1 sec, incrémenter Y pour faire descendre la boîte
 */
function makeBoxesGoDown(box) {
    let boxYPosition = stringToNumber(box.style.top);
    if (isGameFinished === false) {
        if (boxYPosition < 447) {
            boxYPosition += 2;
            box.style.top = boxYPosition + 'px';
            // setInterval(function () {}, 100);
            detectCollision(box);
            window.requestAnimationFrame(() => makeBoxesGoDown(box));
        } else {
            removeBox(box);
        }
    }
}

/**
 * x Is called when collision occurs or when the box has reached the bottom of the game board
 */
function removeBox(element) {
    element.remove();
}

/**
 * detects collision between the Player and the boxes;
 * calls updatesPoints;
 * calls checkIfGameIsFinished;
 */
function detectCollisionAll() {
    Array.from(allBoxes).forEach(element => {
        detectCollision(element);
    });
}

function detectCollision(element) {
    let boxRect = element.getBoundingClientRect();
    let playerRect = playerCursor.getBoundingClientRect();
    let collisionTop = boxRect.bottom >= playerRect.top;
    let collisionLeft = playerRect.right >= boxRect.right && boxRect.right >= playerRect.left;
    let collisionRight = playerRect.left <= boxRect.left && boxRect.left <= playerRect.right;
    if (collisionTop && (collisionLeft || collisionRight)) {
        removeBox(element);
        updatePoints(element);
    }
}

/**
 * if collision, adds/removes points to player.points
 * displays updated points on the screen
 */
function updatePoints(element) {
    let newPoints = element.lastChild.dataset.points;
    let newPointsTypeNumber = stringToNumber(newPoints);
    player.points += newPointsTypeNumber;
    pointsCounter.innerHTML = player.points;
    checkIfGameIsFinished();
}

/**
 * x after each collision, checks if game is finished and returns a boolean
 * x if TRUE: calls youWon() || if FALSE: calls youLost()
 */
function checkIfGameIsFinished() {
    if (player.points >= 1000) {
        youWon();
        isGameFinished = true;
        stopGame();
        return isGameFinished;
    } else if (player.points <= 0) {
        youLost();
        isGameFinished = true;
        stopGame();
        return isGameFinished;
    }
}

/**
 * if nothing happens --> plays background music
 * if collision with a bonus --> bonus sound
 * if collision with a malus --> malus sound
 * if game over --> game over sound
 * if game won --> congrats sound
 */
function soundEffect() {
// à faire
}

// ---
// END OF THE GAME
// ---

function stopGame() {
    gameBoard.classList.add('is-hidden');
    gameBoard.classList.remove('is-visible');
    resetButton.classList.add('is-visible');
    resetButton.classList.remove('is-hidden');
    resetButton.addEventListener('click', () => {
        resetGame();
    });
}

/**
 * updates background music
 * x updates page with either WIN or LOSE text with information about access to abortion in the player's country
 */
function youWon() {
    wonDiv.classList.add('is-visible');
    wonDiv.classList.remove('is-hidden');
}

function youLost() {
    lostDiv.classList.add('is-visible');
    lostDiv.classList.remove('is-hidden');
}

function resetGame() {
    slotMachineButton.classList.add('is-visible');
    slotMachineButton.classList.remove('is-hidden');
    slotMachine.classList.add('is-visible');
    slotMachine.classList.remove('is-hidden');
    resetButton.classList.add('is-hidden');
    resetButton.classList.remove('is-visible');
    slotMachineContent.classList.add('is-visible');
    slotMachineContent.classList.remove('is-hidden');
    player.points = 500;
    pointsCounter.innerHTML = player.points;
    countriesBlock.innerHTML = '';
    prosperityBlock.innerHTML = '';
    numberOfWeeksBlock.innerHTML = '';
    Array.from(allBoxes).forEach(element => {
        removeBox(element)
    });
    if (wonDiv.classList.contains('is-visible')) {
        wonDiv.classList.remove('is-visible');
        wonDiv.classList.add('is-hidden');
    };
    if (lostDiv.classList.contains('is-visible')) {
        lostDiv.classList.remove('is-visible');
        lostDiv.classList.add('is-hidden');
    }
}