highScore = 0
function createBoard(side)
{
    var table = document.createElement('table')
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
    return table
}
function scoreChanger(){
    document.querySelector('#curr').innerHTML = score
    if(score>highScore){
        highScore = score
        document.querySelector('#high').innerHTML = highScore
    }
}