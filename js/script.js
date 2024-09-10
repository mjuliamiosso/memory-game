const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')
const backCard = document.querySelectorAll('.back')
const frontCard = document.querySelectorAll('.front')
const moves = document.querySelector('.moves')

const svTheme = document.querySelector("#sv-theme")
const botwTheme = document.querySelector("#botw-theme")
const mhwTheme = document.querySelector("#mhw-theme")

let hasFlippedCard = false
let firstCard, secondCard
let lockBoard = false
let movesCounter = 0

//Novo jogo
function newGame(){
    //remover o flip
    const cards = document.querySelectorAll('.card.flip')
    cards.forEach(card => {
        card.classList.remove('flip')
    })

    //adicionar eventListener novamente
    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    })
    
    movesCounter = 0
    moves.innerHTML = movesCounter
    shuffleCards()
    closeCongratsModal()
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
        
        //contador de jogadas
        movesCounter += 1
        moves.innerHTML = movesCounter
        return
    } else{
        //segundo clique
        firstCard.addEventListener('click', flipCard)
        hasFlippedCard = false
        secondCard = this

        checkMatch()
        allFlipped()

        
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

//desativar as cartas que deram match
function disableCards(){
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
}

//remover a classe flip caso nao derem match
function unflipCard(){
    lockBoard = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        
        lockBoard = false
    }, 650)
}

//aviso de parabens quando terminar o jogo
function allFlipped(){
    const allFlip = Array.from(card).every(card => card.classList.contains('flip'))

    if(allFlip){
        setTimeout(() =>{
            showCongrats()
        },1000)
    }
}

//Modal para trocar tema
const modalChangeTheme = document.querySelector('#changeTheme')

const theme = document.querySelector('.modalTheme')
theme.onclick = function (){
    modalChangeTheme.showModal()
}

function closeThemeModal() {
    modalChangeTheme.close()
}

svTheme.addEventListener('click', closeThemeModal)
botwTheme.addEventListener('click', closeThemeModal)
mhwTheme.addEventListener('click', closeThemeModal)

//Mudar tema
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
                newGame()
                break
            case frontCard[i].src.includes('sv-theme'):
                frontCard[i].src = nowSrc.replace('sv-theme', nowTheme)
                newGame()
                break
            case frontCard[i].src.includes('mhw-theme'):
                frontCard[i].src = nowSrc.replace('mhw-theme', nowTheme)
                newGame()
                break
        }
    }
}

//modal de parabens
const modalCongrats = document.querySelector('#congrats')

function showCongrats(){
    const finalMoves = document.querySelector('.final-moves')
    finalMoves.innerHTML = movesCounter
    modalCongrats.showModal()
}

function closeCongratsModal() {
    modalCongrats.close()
}