let trashDom = document.querySelector(".trash img");
let bins = document.querySelectorAll(".trashBins img");

let trashes = loadTrashes();
let trash = getRandomTrash();
trashDom.src = trash.src;
trashDom.name = trash.type;

let score = 0;
let scoreText = document.querySelector('h4');
scoreText.innerHTML = "Pontuação: " + score;

let timer = 5;
let timerText = document.querySelector('h3');
timerText.innerHTML = timer;

let gameOver = false;
let gameOverBox = document.querySelector(".gameOver");
gameOverBox.style.display = 'none';

let replayBtn = document.getElementById('replayBtn');
replayBtn.onclick = function() {
    resetGame();
};

// Variáveis para controle de pausa
let isPaused = false;
let pauseButton = document.getElementById('pauseButton');

pauseButton.onclick = function() {
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
};

let intervalId = setInterval(gameLoop, 1000);

function gameLoop() {
    if (!isPaused && !gameOver) {
        timer -= 1;
        if (timer <= 0) {
            timer = 0;
            gameOverBox.style.display = 'block';
            gameOver = true;
            clearInterval(intervalId);
        }
        timerText.innerHTML = timer;
    }
}

function pauseGame() {
    isPaused = true;
    clearInterval(intervalId); // Para o cronômetro
    // Adicione uma sobreposição ou qualquer mensagem que indique que o jogo está pausado
    let pauseOverlay = document.createElement('div');
    pauseOverlay.innerHTML = "<h1>Jogo Pausado</h1><p>Clique para retomar</p>";
    pauseOverlay.style.position = 'fixed';
    pauseOverlay.style.top = '0';
    pauseOverlay.style.left = '0';
    pauseOverlay.style.width = '100%';
    pauseOverlay.style.height = '100%';
    pauseOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    pauseOverlay.style.color = '#fff';
    pauseOverlay.style.textAlign = 'center';
    pauseOverlay.style.paddingTop = '20%';
    pauseOverlay.id = 'pauseOverlay';
    document.body.appendChild(pauseOverlay);
}

function resumeGame() {
    isPaused = false;
    document.body.removeChild(document.getElementById('pauseOverlay')); // Remove a sobreposição
    intervalId = setInterval(gameLoop, 1000); // Retoma o cronômetro
}

function resetGame() {
    timer = 6;
    gameOverBox.style.display = 'none';
    score = 0;
    gameOver = false;
    let trash = getRandomTrash();
    trashDom.src = trash.src;
    trashDom.name = trash.type;
    isPaused = false;
    timerText.innerHTML = timer;
    scoreText.innerHTML = "Pontuação: " + score;
    clearInterval(intervalId); // Para o cronômetro
    intervalId = setInterval(gameLoop, 1000); // Reinicia o cronômetro
}

bins.forEach(bin => {
    bin.addEventListener("dragover", dragTrashOverBin);
    bin.addEventListener("drop", dropTrash);
});

function dragTrashOverBin(event) {
    if (gameOver || isPaused) {
        return;
    }
    event.preventDefault();
}

function dropTrash(event) {
    event.preventDefault();
    bin = event.target;
    if (trashDom.name == bin.name) {
        trash = getRandomTrash();
        trashDom.src = trash.src;
        trashDom.name = trash.type;
        timer = 6;
        score += 1;
        scoreText.innerHTML = "Pontuação: " + score;
    }
}

function getRandomTrash() {
    let randomIndex = Math.floor(Math.random() * trashes.length);
    return trashes[randomIndex];
}

function loadTrashes() {
    let trashes = [];
    for (let i = 1; i <= 4; i++) {
        trashes.push({ type: 'glass', src: `assets/trash/glass/${i}.png` });
        trashes.push({ type: 'hazardous', src: `assets/trash/hazardous/${i}.png` });
        trashes.push({ type: 'metal', src: `assets/trash/metal/${i}.png` });
        trashes.push({ type: 'organic', src: `assets/trash/organic/${i}.png` });
        trashes.push({ type: 'paper', src: `assets/trash/paper/${i}.png` });
        trashes.push({ type: 'plastic', src: `assets/trash/plastic/${i}.png` });
    }
    return trashes;
}
