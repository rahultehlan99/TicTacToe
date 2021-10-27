const gameTurn = document.querySelector('.classturn')
const boxes = document.querySelectorAll('.box')
let arr = Array(9).fill('');

let turn = 'X'
let totalTurns = 0
let someOneWon = 0

// changes the turn
const changeTurn = () =>{
    turn = (turn==='X'?'O':'X')
    gameTurn.innerText = `Player ${turn}'s turn`
}


const clearBoard = () =>{
    
    gameTurn.innerText =`Player ${turn}'s turn`

    // set totalTurn to 0
    totalTurns = 0

    // nobody is winner at start of the game
    someOneWon = 0

    // empty box values
    boxes.forEach((box) => {
    box.innerText = ''})

    // empty the array
    arr.fill('')

    // remove gameWon class
    document.querySelector('.container').classList.remove("gameWon")

}

const gameDrawn = () => {
    
    gameTurn.innerText = "GAME DRAWN"
    gameTurn.style.background = "red"

    setTimeout(clearBoard,5000)
}

const gameWon = winner =>{
    
    document.querySelector('.container').classList.add("gameWon")
    gameTurn.innerText =  `${winner} has win the game!!!!`

    setTimeout(clearBoard,5000)
}


// checks if any player wins
const checkforWin = () => {
    
    // winner to be found
    let winner = ''
    let i

    console.log("current status " + arr)    

    // any row same
    for(i=0;i<9;i+=3)
    {
        if(arr[i]!=='' && arr[i]===arr[i+1] && arr[i+1]===arr[i+2])
        {      
            winner=turn
        }
    }    

    // any column same
    for(i=0;i<3;i++)
    {
        if(arr[i]!=='' && arr[i]===arr[i+3] && arr[i+3]===arr[i+6])
        {       
            winner=turn
        }
    } 

    // any diagonal same
    if(arr[0]!=='' && arr[0]===arr[4] && arr[4]===arr[8])
    {
        winner=turn
    }
    
    if(arr[2]!==''  && arr[2]===arr[4] && arr[4]===arr[6])
    {
        winner=turn
    }

    if(winner!=='')
    {
        console.log(winner)
        someOneWon = 1
        gameWon(winner)
        return
    }

    changeTurn()
}

boxes.forEach((ele)=>{
    ele.addEventListener('click',(e)=>{
        if(e.target.innerText==='')
        {
            e.target.innerText = turn
            
            let indexchanged = Array.from(e.target.parentNode.children).indexOf(e.target)

            //console.log("Index clicked : " + indexchanged)

            arr[indexchanged] = turn

            totalTurns++

            checkforWin()

            if(!someOneWon && totalTurns==9)
            {
                gameDrawn()
            }
        }
    })
})


