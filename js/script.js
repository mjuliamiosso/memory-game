const board = document.querySelector('.board')

//Cartas
const items = [
    {image: './img/zelda-theme/card-1.png', id: 1},
    {image: './img/zelda-theme/card-2.png', id: 2},
    {image: './img/zelda-theme/card-3.png', id: 3},
    {image: './img/zelda-theme/card-4.png', id: 4},
    {image: './img/zelda-theme/card-5.png', id: 5},
    {image: './img/zelda-theme/card-6.png', id: 6},
    {image: './img/zelda-theme/card-7.png', id: 7},
    {image: './img/zelda-theme/card-8.png', id: 8},
    {image: './img/zelda-theme/card-9.png', id: 9}
]

//Criando as cartas
function newGame(){
    let cards = [...items, ...items]
    //Embaralhar as cartas
    const shuffledCards = cards.sort(() => 0.5 - Math.random())

    shuffledCards.map((card) => {
        board.innerHTML += `
        <div class= "card" data-id=${card.id}>
            <img class= "view cover" src="./img/zelda-theme/cover.png" />
            <img class= "view front" src= ${card.image}>
        </div>
        `
    })
}