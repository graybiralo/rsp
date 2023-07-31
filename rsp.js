const userChoiceButtons = document.querySelectorAll('.user-selection')
const outComeDiv = document.querySelector('.result')
const container = document.querySelectorAll('.container')
const playerScoreBoard = document.querySelector('.p-count');
const computerScoreBoard = document.querySelector('.c-count');
const finalOutCome = document.querySelector('.finalScore');
const newGame = document.querySelector('.reset');
const randomChoice = document.querySelector('.faith');
let round = 0;

// getting computer to choose weapon


function getComputerChoice() {
    let choice = ["Rock", "Paper", "Scissor"];
    let randomRsp = choice[Math.floor(Math.random() * choice.length)];
    return randomRsp;
}





// conditon of winning for player 


const playerWiningCondition = {
    'Rock': 'Scissor',
    'Paper': 'Rock',
    'Scissor': 'Paper'
}

let playerScore = 0
let computerScore = 0

const renderScoreBoard = (playerScore, computerScore) => {
    playerScoreBoard.textContent = playerScore;
    computerScoreBoard.textContent = computerScore;
}

const roundOver = () => {
    if (playerScore !== computerScore) {
        finalResult(playerScore, computerScore)
        playerScore = 0
        computerScore = 0
        round = 0
    }
}

function roundOne(playerSelection, computerSelection) {
    round += 1
    if (playerSelection === computerSelection) {
        return 'Draw'
    } else if ( playerWiningCondition[playerSelection] === computerSelection) {
        playerScore++
        return message('Win', playerSelection, computerSelection)
    } else {
        computerScore++
        return message('Lose', computerSelection, playerSelection)
    }
}


//  geeting scores

const finalResult = (yourScore, computerScore) => {
    let resultDiv = document.createElement('div')
    if (yourScore > computerScore) {
        resultDiv.textContent = `You win! you: ${yourScore} computer: ${computerScore}`
        finalOutCome.append(resultDiv)
    } else {
        resultDiv.textContent = `You lose! you: ${yourScore} computer: ${computerScore}`
        finalOutCome.append(resultDiv)
    }
}

const message = (result, win, lose) => (`You ${result}! ${win} beats ${lose}`)


userChoiceButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const computerChoice = getComputerChoice()
        let playerSelection = e.target.getAttribute('data-choice')
        if (playerSelection === 'random') {
            playerSelection = getComputerChoice()
        }

        showHand(playerSelection.toLowerCase(), 'player')
        showHand(computerChoice.toLowerCase(), 'computer')
        result = roundOne(playerSelection, computerChoice)
        outComeDiv.textContent = result
        renderScoreBoard(playerScore, computerScore)
        if (round >= 3 ) {
            roundOver()
        }
    })
})


const showHand = (hand, type) => {
    let toRemoveHandList
    const handName = `${type}-${hand}`
    if (type === 'player') {
        toRemoveHandList = ['player-rock', 'player-scissor', 'player-paper'].filter((toRemoveHand) => handName !== toRemoveHand)
    } else {
        toRemoveHandList = ['computer-rock', 'computer-scissor', 'computer-paper'].filter((toRemoveHand) => handName !== toRemoveHand)
    }
    const handImage = document.getElementsByClassName(handName)[0]
    if (handImage.style.display === ''|| handImage.style.display === 'none') {
        handImage.style.display = 'block'
    }
    toRemoveHandList.forEach((toRemoveHand) =>{
        document.getElementsByClassName(toRemoveHand)[0].style.display = 'none'
    })
}



newGame.addEventListener('click',() => location.reload());



