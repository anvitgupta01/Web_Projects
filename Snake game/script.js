// Script constants:
let inputdir = { x: 0, y: 0 };
const foodmusic = new Audio('music/food.mp3');
const gameover = new Audio('music/gameover.mp3');
const gamemusic = new Audio('music/music.mp3');
const move = new Audio('music/move.mp3');

var lastPaintedTime = 0;
var speed = 2;
var score = 0;
var hiscore = 0;

// for changing the image at the background:
const images = [
    "rgb(192,112,112)", "rgb(64,146,135)", "rgb(150,74,201)"
]

let x = 0;

setInterval(() => {
    let board = document.querySelector('.board');
    x = (x == images.length - 1) ? 0 : (x + 1);
    board.style.backgroundColor = images[x];
}, 6000)

window.onkeydown = () => {
    gamemusic.play();
}

// Position of head of the snake:
// Note that x is measured in left to right direction and y is measured in vertical down direction with origin at top-left corner of the board:
let snakeArr = [
    { x: 13, y: 15 },
]

let food = {
    x: 6,
    y: 8
}

// Script functions:

// cTime means that "currentTime"
const main = (cTime) => {
    window.requestAnimationFrame(main);
    // console.log(cTime)

    // To decreases the "renders" in our game we place a condition:
    if ((cTime - lastPaintedTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintedTime = cTime;
    gameAction();
}

const isCollide = (snakeArray) => {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[0].x == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y) {
            return true;
        }
    }
    if (snakeArray[0].x >= 18 || snakeArray[0].x < 0 || snakeArray[0].y >= 18 || snakeArray[0].y < 0) {
        return true;
    }
    return false;
}

const gameAction = () => {
    // Updating snake position:
    if (isCollide(snakeArr)) {
        gameover.play();
        gamemusic.pause();
        speed = 2;
        inputdir = { x: 0, y: 0 };
        alert("Game Over, press any key to continue");
        snakeArr = [{ x: 13, y: 15 }]
        gamemusic.play();
        score = 0;
        let score1 = document.querySelector('.score');
        score1.innerHTML = `Your score : ${score}`;
    }

    if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
        foodmusic.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y });
        score += 1;
        let score1 = document.querySelector('.score');
        score1.innerHTML = `Your score : ${score}`;

    
     

        // You can also store the hiscore variable in localstorage so that on refresh it will not get affected.

        // Method-1:

        if(score>hiscore){
            hiscore = score;
        }

        let hisc = document.querySelector(".high-score");
        hisc.innerHTML = `High score : ${hiscore}`;

        let a = 1;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

        setTimeout(() => {
            speed += 1;
        }, 1000)
    }


    // Moving the snake:
    for (let i = (snakeArr.length - 2); i >= 0; i--) {
        // This is done to actually equate them that they are both equal.
        // If we write snakeArr[i+1]=snakeArr[i], then it will say that snakeArr[i+1] now will point to snakeArr[i].    
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputdir.x;
    snakeArr[0].y += inputdir.y;

    // Render the snake and food:
    // Render or display the snake:
    let board = document.querySelector('.board');
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('snakehead');
        }
        else {
            snakeElement.classList.add('snakeBody')
        }
        board.append(snakeElement);
    });

    // Render or display the food:
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.append(foodElement);
}


// Script logic:

// This is required when we want to render the page again and again : we are not using setinterval here as it is not efficient to create game-loops:
// The question is most simply answered with requestAnimationFrame produces higher quality animation completely eliminating flicker and shear that can happen when using setTimeout or setInterval, and reduce or completely remove frame skips.
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
    move.play();
    inputdir = { x: 0, y: 1 };
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;
        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        default:
            break;
    }
})