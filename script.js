const celulasElements = document.querySelectorAll('[data-cell]');
const tela = document.querySelector('[data-tela]');
const mensagemVitoriaelement = document.querySelector('[data-mensagem-vitoria]')
const mensagemVitoria = document.querySelector('[save-vitoria-mensagem]')
const botaoReiniciar = document.querySelector('[data-vitoria-button]');

let vezBolinha;

const combinacaoVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2,5 ,8],
    [0, 4, 8],
    [2, 4, 6]
]

const inicioGame = () => {
    vezBolinha = false;
    for (const cell of celulasElements){
        cell.classList.remove('bolinha');
        cell.classList.remove('x');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    }

    vezDeJogar()
    mensagemVitoria.classList.remove('mostrar-mensagem')
};



const fimDoJogo = (empate) => {
    if(empate){
        mensagemVitoriaelement.innerText = 'Empate'
    } else{
        mensagemVitoriaelement.innerText = vezBolinha ? 'Bolinha Venceu!' : 'X Venceu!';
    }

    mensagemVitoria.classList.add('mostrar-mensagem')
};


const checarVitoria = (currentPlayer) =>{
    return combinacaoVitoria.some((combinacao) => {
        return combinacao.every(index => {
            return celulasElements[index].classList.contains(currentPlayer);
        })
    })
};


const checarEmpate = () => {
    return[...celulasElements].every(cell =>{
       return cell.classList.contains('x') || cell.classList.contains('bolinha');
    })
}


const placeMark = (cell, addClass) =>{
    cell.classList.add(addClass);
};

const vezDeJogar = () => {
    tela.classList.remove('bolinha');
    tela.classList.remove('x');

    if(vezBolinha){
        tela.classList.add('bolinha');
    }else{
        tela.classList.add('x');
    }
}
const mudarSimb = () =>{
    vezBolinha = !vezBolinha; 
    vezDeJogar()
};


const handleClick = (e) => {
    //incrementar X ou O
    const cell = e.target;
    const addClass = vezBolinha ? "bolinha" : "x";

    placeMark(cell, addClass);
    //Checar vitoria
    const vitoria = checarVitoria(addClass);

    const isEmpate = checarEmpate();
    if(vitoria){
        fimDoJogo(false)
    } else if(isEmpate) {
        fimDoJogo(true)
    }else{
        mudarSimb();
    }
};


inicioGame();

botaoReiniciar.addEventListener('click', inicioGame);

