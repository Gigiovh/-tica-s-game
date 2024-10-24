let vilura = document.getElementById('vilura');
let lixos = document.querySelectorAll('.falling-litter');
let peixes = document.querySelectorAll('.falling-fish');
let gameContainer = document.querySelector('.game-container');
let scoreElement = document.getElementById('score');
let fase1 = document.getElementById('fase1');
let startButton = document.getElementById('startButton');
let blurBackground = document.getElementById('blurBackground');

// Variáveis globais para controle do jogo
let viluraPosition;
let velocidade; // Velocidade inicial do Vilura
let velocidadeObjetos; // Velocidade inicial dos objetos
let score = 0;
let keys = {};
let isGamePaused = false; // Variável para controlar o estado do jogo
let fallIntervals = []; // Armazena intervalos dos objetos em queda

// Atributos de pontuação
const scoreValueLixo1 = 10;
const scoreValueLixo2 = 20;
const scoreValueLixo3 = 30;
const scoreValuePeixe1 = -10;
const scoreValuePeixe2 = -20;
const pauseButton = document.getElementById('pauseButton');
const icon = pauseButton.querySelector('.icon');

// Função para iniciar o jogo
startButton.addEventListener('click', () => {
    // Configuração inicial do jogo
    blurBackground.style.display = 'none'; // Remove o blur
    fase1.style.display = 'none'; // Esconde a fase 1
    gameContainer.style.display = 'block'; // Exibe o jogo

    // Reiniciar variáveis do jogo
    resetGame();
    iniciarJogo(); // Inicia o jogo
});

// Função para reiniciar as variáveis do jogo
function resetGame() {
    // Redefinir posição do Vilura
    viluraPosition = (gameContainer.clientWidth / 2) - (vilura.clientWidth / 2);
    vilura.style.left = `${viluraPosition}px`;

    // Redefinir velocidades
    velocidade = 5;
    velocidadeObjetos = 5;

    // Redefinir pontuação
    score = 0;
    scoreElement.textContent = `Pontuação: ${score}`;
}

// Implementar a lógica para iniciar o jogo
function iniciarJogo() {
    isGamePaused = false; // Garante que o jogo não está pausado
    requestAnimationFrame(moveVilura);
    lixos.forEach((lixo, index) => fallObject(lixo, [scoreValueLixo1, scoreValueLixo2, scoreValueLixo3][index]));
    peixes.forEach((peixe, index) => fallObject(peixe, [scoreValuePeixe1, scoreValuePeixe2][index]));
}

// Eventos de teclado
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Função para mover o Vilura
function moveVilura() {
    if (!isGamePaused) { // Verifica se o jogo não está pausado
        let viluraRect = vilura.getBoundingClientRect();
        let containerRect = gameContainer.getBoundingClientRect();

        if (keys['ArrowLeft'] && viluraRect.left > containerRect.left) {
            viluraPosition -= velocidade;
            if (viluraPosition < 0) {
                viluraPosition = 0;
            }
        }

        if (keys['ArrowRight'] && viluraRect.right < containerRect.right) {
            viluraPosition += velocidade;
            if (viluraPosition + vilura.clientWidth > gameContainer.clientWidth) {
                viluraPosition = gameContainer.clientWidth - vilura.clientWidth;
            }
        }

        vilura.style.left = `${viluraPosition}px`;
    }

    requestAnimationFrame(moveVilura);
}

// Mostrar o indicador de pontos
function showPointIndicator(value, x, y) {
    const pointIndicator = document.createElement('div');
    pointIndicator.classList.add('point-indicator');
    pointIndicator.textContent = value;
    pointIndicator.style.left = `${x}px`;
    pointIndicator.style.top = `${y}px`;
    document.body.appendChild(pointIndicator);

    pointIndicator.animate(
        [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-30px)', opacity: 1 },
            { transform: 'translateY(-50px)', opacity: 0 }
        ],
        {
            duration: 1000,
            easing: 'ease-out',
            fill: 'forwards'
        }
    );

    setTimeout(() => {
        pointIndicator.remove();
    }, 1000);

}


// botão para mudar de fase ao ser concluida 
document.getElementById('botao-mudar-fase').onclick = function() {
    FaseChange();
    document.getElementById('mensagem-mudanca').style.display = 'none'; 
    document.getElementById('fundo').style.display = 'none'; 
    // aqui muda a fase e faz com que a mensagem suma.
};
// aperecer a mensagem apos a fase ser concluida
function EndMessage(){
    const mensagemDiv = document.getElementById('mensagem-mudanca');
    document.getElementById('fundo').style.display = 'block'; 
    mensagemDiv.style.display = 'block'; 
    // aqui a mensagem esta aparecendo
}

// função para mudar de fase
function FaseChange(){
    window.location.href = '../Fase II/fase2.html';
    // aqui estamos mudando!!
}

// Função para fazer os objetos caírem
function fallObject(object, scoreValue) {
    let position = Math.random() * (gameContainer.clientWidth - object.clientWidth);
    object.style.left = `${position}px`;
    object.style.top = `-50px`;

    let fallInterval = setInterval(() => {
        if (!isGamePaused) { // Verifica se o jogo não está pausado
            let top = parseInt(window.getComputedStyle(object).getPropertyValue('top'));
            if (top > gameContainer.clientHeight) {
                clearInterval(fallInterval);
                fallObject(object, scoreValue);
            } else {
                object.style.top = `${top + velocidadeObjetos}px`;

                let viluraRect = vilura.getBoundingClientRect();
                let objectRect = object.getBoundingClientRect();

                if (
                    viluraRect.left < objectRect.left + objectRect.width &&
                    viluraRect.left + viluraRect.width > objectRect.left &&
                    viluraRect.top < objectRect.top + objectRect.height &&
                    viluraRect.height + viluraRect.top > objectRect.top
                ) {
                    clearInterval(fallInterval);
                    score += scoreValue;
                    scoreElement.textContent = `Pontuação: ${score}`;

                    const x = viluraRect.left + viluraRect.width / 2;
                    const y = viluraRect.top;

                    let displayValue = scoreValue > 0 ? `+${scoreValue}` : `${scoreValue}`;
                    showPointIndicator(displayValue, x, y);

                    fallObject(object, scoreValue);

                    // Aumenta a velocidade do Vilura e dos objetos com base na pontuação
                    if (score % 20 === 0 && score <= 220) {
                        velocidade += 1;
                    }

                    if (score % 40 === 0 && score <= 220) {
                        velocidadeObjetos += 0.5;
                    }

                    // mudar de fase
                    if(score >= 300){
                        EndMessage();
                        togglePause();
                    }
                }
            }
        }
    }, 20);

    fallIntervals.push(fallInterval); // Armazena o intervalo
}

// Função para pausar o jogo
pauseButton.addEventListener('click', togglePause);

function togglePause() {
    isGamePaused = !isGamePaused; // Alterna o estado de pausa

    if (isGamePaused) {
        // Para todos os intervalos de queda
        fallIntervals.forEach(interval => clearInterval(interval)); 
    } else {
        // Reinicia a queda dos objetos após despausar
        lixos.forEach((lixo, index) => fallObject(lixo, [scoreValueLixo1, scoreValueLixo2, scoreValueLixo3][index]));
        peixes.forEach((peixe, index) => fallObject(peixe, [scoreValuePeixe1, scoreValuePeixe2][index]));
    }
}
