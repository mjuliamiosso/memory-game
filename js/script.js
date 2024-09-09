const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')
const backCard = document.querySelectorAll('.back')
const frontCard = document.querySelectorAll('.front')
const moves = document.querySelector('.moves')
const themes = document.querySelector('#modal')
const modal = document.querySelector('dialog')
const buttonTheme = document.querySelector('.modal-close')
const svTheme = document.querySelector("#sv-theme")
const botwTheme = document.querySelector("#botw-theme")
const mhwTheme = document.querySelector("#mhw-theme")

let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false
let movesCounter = 0

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
        firstCard.removeEventListener('click', flipCard)

        return
    } else{
        //segundo clique
        firstCard.addEventListener('click', flipCard)
        hasFlippedCard = false
        secondCard = this

        checkMatch()

        //contador de jogadas
        movesCounter += 1
        moves.innerHTML = movesCounter
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

//Modal
themes.onclick = function (){
    modal.showModal()
}

function closeModal() {
    modal.close()
}

console.log(frontCard[3])

svTheme.addEventListener('click', closeModal)
botwTheme.addEventListener('click', closeModal)
mhwTheme.addEventListener('click', closeModal)

function changeTheme(theme){
    const nowTheme = theme
    
    for (let i = 0; i < backCard.length; i++){
        backCard[i].src=`./img/${nowTheme}/cover.png`
    }

    for (let i = 0; i < frontCard.length; i++){
        nowSrc = frontCard[i].src
        switch(true){
            case frontCard[i].src.includes('botw-theme'):
                frontCard[i].src = nowSrc.replace('botw-theme', nowTheme)
                break
            case frontCard[i].src.includes('sv-theme'):
                frontCard[i].src = nowSrc.replace('sv-theme', nowTheme)
                break
            case frontCard[i].src.includes('mhw-theme'):
                frontCard[i].src = nowSrc.replace('mhw-theme', nowTheme)
                break
        }
    }
}