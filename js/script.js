const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false

//Novo jogo
function newGame(){
    location.reload()
}

//Virar a carta
function flipCard(){
    if(lockBoard) return
    this.classList.toggle('flip')

    if(!hasFlippedCard){
        //primeiro clique
        hasFlippedCard = true
        firstCard = this

        return
    } else{
        //segundo clique
        hasFlippedCard = false
        secondCard = this

        checkMatch()
    }
}

card.forEach(card => card.addEventListener('click', flipCard))

//Bagunçar cartas
function shuffleCards(){
    for(let i = board.children.length; i >= 0; i--){
        board.appendChild(board.children[Math.random()* i|0])
    }
}

shuffleCards()

//Checar as cartas
function checkMatch(){
    if(firstCard.dataset.id === secondCard.dataset.id){
        disableCards()
    } else {
        unflipCard()
    }
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

function unflipCard(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        
        lockBoard = false
    }, 650)
}