const images = [
    'garrafa.png', 
    'sacola.png', 
    'lata.png', 
    'pneu.png', 
    'colher.png', 
    'rede.png', 
    'pneu.png', 
    'garrafa.png', 
    'colher.png', 
    'sacola.png',
    'colher.png',
    'lata.png',
    'pneu.png',
    'lata.png',
    'pneu.png'
];

let clickedElements = 0;
const totalElements = images.length;
let timerEnded = false;
let gamePaused = false;  // Variável para controlar o estado de pausa
let countdown;           // Variável para armazenar o intervalo do timer

// Função para criar os elementos clicáveis
function createClickableElements() {
    const positions = [
        { top: 615, left: 50 },
        { top: 630, left: 300 },
        { top: 350, left: 5 },
        { top: 700, left: 700 },
        { top: 200, left: 1200 },
        { top: 500, left: 1000 },
        { top: 810, left: 910 },
        { top: 530, left: 600 },
        { top: 90, left: 800 },
        { top: 450, left: 870 },
    
        // Novas posições ajustadas para as últimas 5
        { top: 950, left: 400 },    // Ajuste para não se sobrepor com as anteriores
        { top: 200, left: 1200 },   // Nova posição para maior espaçamento
        { top: 450, left: 800 },   // Mais afastado à direita
        { top: 350, left: 500 },   // Mais para cima e à direita
        { top: 100, left: 100 }    // Posição mais para a direita e acima
    ];
    

    const maxTop = window.innerHeight - 70;
    const maxLeft = window.innerWidth - 70;

    positions.forEach(pos => {
        pos.top = Math.min(pos.top, maxTop);
        pos.left = Math.min(pos.left, maxLeft);

        let element = document.createElement('div');
        element.classList.add('clickable');
        const randomImage = images[Math.floor(Math.random() * images.length)];

        const imgElement = document.createElement('img');
        imgElement.src = randomImage;
        imgElement.alt = 'Imagem Clicável';
        imgElement.style.width = '100%';
        imgElement.style.height = '100%';
        imgElement.style.objectFit = 'cover';

        element.appendChild(imgElement);
        element.style.top = pos.top + 'px';
        element.style.left = pos.left + 'px';

        // Se o jogo estiver pausado, desabilitamos o evento de clique
        element.onclick = function () {
            if (!gamePaused) {  // Só permite clicar se o jogo não estiver pausado
                hideElement(element);
                incrementClickedCount();
            }
        };

        document.getElementById('content').appendChild(element);
    });
}

// Função para esconder o elemento
function hideElement(element) {
    element.style.opacity = 0;
    setTimeout(function () {
        element.style.display = 'none';
    }, 300);
}

// Função para incrementar o contador de elementos clicados
function incrementClickedCount() {
    clickedElements++;
    updateRemainingCounter();
    checkSuccessCondition();
}

// Função para verificar se todos os elementos foram clicados
function checkSuccessCondition() {
    if (clickedElements === totalElements) {
        showSuccessMessage();
    }
}

// Função para atualizar o contador de elementos restantes
function updateRemainingCounter() {
    const remainingElement = document.getElementById('remaining');
    remainingElement.textContent = `Restantes: ${totalElements - clickedElements}`;
}

// Função para iniciar o timer
function startTimer() {
    let secondsLeft = 20;
    const timerElement = document.getElementById('timer');

    countdown = setInterval(function () {
        if (!gamePaused) {  // Só decrementa se o jogo não estiver pausado
            secondsLeft--;
            timerElement.textContent = `${secondsLeft} s`;

            if (secondsLeft <= 0) {
                clearInterval(countdown);
                timerEnded = true;
                checkTimerCondition();
            }
        }
    }, 1000);
}

// Função para checar o estado do timer
function checkTimerCondition() {
    if (timerEnded && clickedElements < totalElements) {
        document.getElementById('retryButton').style.display = 'block';
    }
}

// Função para exibir a mensagem de sucesso
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    const timerElement = document.getElementById('timer');
    const nextButton = document.getElementById('nextLevelButton');
    successMessage.style.display = 'block';
    timerElement.style.display = 'none';
    nextButton.style.display = 'block'; // Exibe o botão "Próxima Fase"
}

// Função para reiniciar o jogo
function retryGame() {
    location.reload();
}

// Função para avançar para a próxima fase
function goToNextLevel() {
    window.location.href = '../Fase III/index.html';  // Caminho relativo para a pasta "Fase III"
}

// Função para pausar o jogo e ativar/desativar o overlay
function togglePause() {
    gamePaused = !gamePaused;  // Alterna o estado de pausa

    const pauseButton = document.getElementById('pauseButton');
    const overlay = document.getElementById('overlay');

    if (gamePaused) {
        // Mostra o overlay e altera o ícone para "play"
        overlay.style.display = 'block';
        pauseButton.innerHTML = `<img src="play-icon.png" alt="Retomar" class="icon">`;
    } else {
        // Esconde o overlay e altera o ícone para "pause"
        overlay.style.display = 'none';
        pauseButton.innerHTML = `<img src="pause-icon.webp" alt="Pausar" class="icon">`;
    }
}

// Adiciona o evento de clique para o botão de pausa
document.getElementById('pauseButton').addEventListener('click', togglePause);

// Inicia o jogo
createClickableElements();
startTimer();
