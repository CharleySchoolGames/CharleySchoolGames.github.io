highScore = 0
let interval = 100
let myinterval
function updateDifficulty(){
    clearInterval(myinterval)
    initSnake()
    makeBoard()
    interval = (1000 / document.querySelector('#difficulty').value)
    myinterval = setInterval(function(){
        moveSnake()
    }, interval)
}
function createBoard(side)
{
    var table = document.createElement('table')
    table.className = "tableClass"
    for(i=0; i<side; i++)
    {
        var row = document.createElement('tr')
        row.id = `row${i}`
        for(j=0; j<side; j++)
        {
            var cell = document.createElement('td')
            cell.id = `cell${j}`
            cell.classList.add('emptyCell')
            row.appendChild(cell)
        }
        table.appendChild(row)
    }
    table.id = "gameBoard"
    return table
}
function scoreChanger(){
    document.querySelector('#curr').innerHTML = score
    if(score>highScore){
        highScore = score
        document.querySelector('#high').innerHTML = highScore
    }
}
function redoBoard(num){
    boardSize = num
    var tmp = document.querySelector('#gameBoard')
    tmp.remove()
    tmpdiv = document.querySelector('#bigDiv')
    board = tmpdiv.appendChild(createBoard(num))
    initSnake()
    makeApple()
    makeBoard()
}