const board = document.querySelector('.board')
const card = document.querySelectorAll('.card')

//Virar a carta
function flipCard(){
    this.classList.toggle('flip')
}

card.forEach(card => card.addEventListener('click', flipCard))