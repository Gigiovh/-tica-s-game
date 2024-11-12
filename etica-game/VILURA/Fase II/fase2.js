const images = [
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png', 
    'garrafa.png'
];

let clickedElements = 0;
const totalElements = images.length;
let timerEnded = false;

// Função para criar os elementos clicáveis
function createClickableElements() {
    const positions = [
        { top: 615, left: 50 },
        { top: 630, left: 300 },
        { top: 350, left: 5 },
        { top: 600, left: 700 },
        { top: 200, left: 1200 },
        { top: 500, left: 1000 },
        { top: 610, left: 910 },
        { top: 530, left: 600 },
        { top: 90, left: 1800 },
        { top: 450, left: 870 }
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

        element.onclick = function () {
            hideElement(element);
            incrementClickedCount();
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

    const countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = `${secondsLeft} s`;

        if (secondsLeft <= 0) {
            clearInterval(countdown);
            timerEnded = true;
            checkTimerCondition();
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
    // Redireciona para a pasta "Fase III" e abre o arquivo fase3.html
    window.location.href = '../Fase III/index.html';  // Caminho relativo para a pasta "Fase III"
}


// Inicia o jogo
createClickableElements();
startTimer();

