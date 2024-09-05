const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')

//Virar a carta
function flipCard(){
    this.classList.toggle('flip')
}

card.forEach(card => card.addEventListener('click', flipCard))

//Bagunçar cartas
function shuffleCards(){
    for(let i = board.children.length; i >= 0; i--){
        board.appendChild(board.children[Math.random()* i|0])
    }
}

shuffleCards()