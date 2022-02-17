let snake = {}
let apple = {}
let score = 0
function randInt(){
    return Math.floor(Math.random() * 16)
}
function initSnake(){
    snake = {
        facing: "N",
        parts: [
            [8,9],
            [8,8],
            [8,7]
        ],
        lastmove: ''
    }
    score = 0
}
function makeApple(){
    apple = {
        coords: {
            x: randInt(),
            y: randInt()
        }
    }
    for(x=0; x<snake.parts.length; x++){
        if(snake.parts[x][0] === apple.coords.y && snake.parts[x][1] === apple.coords.x){
            makeApple()
        }
    }
}
function moveSnake(){
    for(x=snake.parts.length-1; x>0; x--){
        snake.parts[x][1] = snake.parts[x-1][1];
        snake.parts[x][0] = snake.parts[x-1][0];
    }
    if(snake.facing == "N"){
        snake.parts[0][0]--;
    }else if(snake.facing == "S"){
        snake.parts[0][0]++;
    }else if(snake.facing == "E"){
        snake.parts[0][1]++;
    }else if(snake.facing == "W"){
        snake.parts[0][1]--;
    }
    snake.lastmove = snake.facing
    detectDeath()
    detectApple()
    makeBoard()
    scoreChanger()
    return snake
}
function makeBoard(){
    clearSnake()
    for(let x of snake.parts){
        part = document.querySelector(`#row${x[0]} #cell${x[1]}`)
        part.className = 'Cell'
    }
    appleCell = document.querySelector(`#row${apple.coords.y} #cell${apple.coords.x}`)
    appleCell.className = 'appleCell'
}

function clearSnake(){
    for(y=0; y<16; y++){
        for(x=0; x<16; x++){
            part = document.querySelector(`#row${y} #cell${x}`)
            part.className = "emptyCell"
        }
    }
}
document.addEventListener('keydown', function(event) {
    if((event.keyCode === 87 || event.keyCode === 38) && snake.lastmove !== "S"){ //w
        snake.facing = "N"
    }else if((event.keyCode === 65 || event.keyCode === 37) && snake.lastmove !== "E"){  //a
        snake.facing = "W"
    }else if((event.keyCode === 83 || event.keyCode === 40) && snake.lastmove !== "N"){  //s
        snake.facing = "S"
    }else if((event.keyCode === 68 || event.keyCode === 39) && snake.lastmove !== "W"){  //d
        snake.facing = "E"
    }
})
function detectApple(){
    if(snake.parts[0][0] === apple.coords.y && snake.parts[0][1] === apple.coords.x){
        let tmpHead = snake.parts[snake.parts.length-1]
        let tlist = [tmpHead[0],tmpHead[1]]
        snake.parts.push(tlist)
        score++
        makeApple()
        return true
    }
    return false
}
function detectDeath(){
    if((snake.parts[0][0] < 0 || snake.parts[0][1] < 0) || (snake.parts[0][0] > 15 || snake.parts[0][1] > 15)){
        initSnake()
        return true
    }
    for(x=snake.parts.length-1; x>0; x--){
        if(snake.parts[0][0] === snake.parts[x][0] && snake.parts[0][1] === snake.parts[x][1]){
            initSnake()
            return true
        }
    }
    return false
}
initSnake()
makeApple()
makeBoard()