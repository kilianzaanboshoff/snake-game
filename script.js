// Define HTML Elements
const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

// Define game variables
let gridSize = 20;
let snake = [{x: 10, y: 10}];
let food = generateFood();
let direction ='up';
let GameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;




// Draw game map, snake, food
function draw() {
    board.innerHTML = ''; //Every time we draw, we clear the board
    drawSnake();
    drawFood();
}

// Draw snake

function drawSnake() {
    snake.forEach(segment => {
        const snakeElement = createGameElement('div', 'snake'); //This function will create every snake element and giving it the snake class (Which we have already styled in our CSS) - It gives the illusion that there is a snake
        setPosition (snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

//Create a snake or food cube/div

function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className; //We re taking the snake element and adding it to the div we are creating as a class - it creates a div with a class name as snake
    return element;

}

// Set position of snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x; //We are setting the position of the snake element to the position of the snake
    element.style.gridRow = position.y;
}

// Testing draw function
// draw();


// Draw food function
function drawFood () {
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

// Generate food function
function generateFood() {
    const x = Math.floor(Math.random() * gridSize)+ 1;
    const y = Math.floor(Math.random() * gridSize)+ 1;
    return { x, y };

}

// Move snake function

function move(){
    const head = {...snake[0]}; //We are creating a copy of the snake head. but it is not changing the initial snake head position
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;  
         case 'left':
            head.x--;
            break;  
        case 'right':
            head.x++; //We are increment the x position of the snake head by 1 
            break;
    }
       
        snake.unshift(head); //We are adding the new head to the snake array
        //snake.pop(); //We are removing the last element of the snake array, it gives the illusion that the snake is moving
    
    if (head.x === food.x && head.y === food.y) {
        food = generateFood(); //This means there will be a new food placed on the map
        increaseSpeed();
        clearInterval(GameInterval); //This will stop the interval
        GameInterval = setInterval(() => {
            move(); // move first
            checkCollision();
            draw(); // Then draw again new position
        }, gameSpeedDelay);
    }
    else {
        snake.pop(); //We are removing the last element of the snake array, it gives the illusion that the snake is moving
    }
}

//Test move function
// setInterval(() => {

//     move(); // move first
//     draw(); // Then draw again new position

// }, 200);


// Start game function

function StartGame () {
    gameStarted = true; //keep track of the game state, whether it is running or not
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    GameInterval = setInterval(() => {
        move(); // move first
        checkCollision();
        draw(); // Then draw again new position
    }, gameSpeedDelay);

}


// Create a keypress event listener 

function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') || 
        (!gameStarted && event.key === ' ') 
        ) {
        StartGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
    }
    }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
    console.log(gameSpeedDelay);
    if (gameSpeedDelay > 150 ){
        gameSpeedDelay -= 5; //This will increase the speed of the snake
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3; //This will increase the speed of the snake
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2; //This will increase the speed of the snake
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1; //This will increase the speed of the snake
    }
}

function checkCollision() {
    const head  = snake [0]
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }



}

function resetGame() {
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction ='up';
    gameSpeedDelay = 200;
    clearInterval(GameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
    draw();
}
