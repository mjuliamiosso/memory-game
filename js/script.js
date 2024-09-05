const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')
let hasFlippedCard = false
let firstCard, secondCard

//Virar a carta
function flipCard(){
    this.classList.toggle('flip')

    if(!hasFlippedCard){
        //primeiro clique
        hasFlippedCard = true
        firstCard = this
    } else{
        //segundo clique
        hasFlippedCard = false
        secondCard = this
        console.log(firstCard.dataset.id)
        console.log(secondCard.dataset.id)
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
        console.log('matched')
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
    } else {
        console.log('wrong')
        setTimeout(unflipCard, 650)
    }
}

function unflipCard(){
    firstCard.classList.remove('flip')
    secondCard.classList.remove('flip')
}