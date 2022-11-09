let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); // 'context' renderiza o jogo em plano 2D
let box = 32; // será o tamanho de cada quadradinho do jogo, ou seja, 32x32 px cada
let snake = [];// será passado algo dentro de snake

// passando as propriedades do array snake
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";// direção da cobrinha
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,/* Math.floor = retira a parte flutuante (parte decimal) dos números criados aleatoriamente */
    y: Math.floor(Math.random() * 15 + 1) * box
}

// Background
// altura do canvas será de 16 * box
// largura do canvas será de 16 * box
function criarBG() {
    context.fillStyle = "Lightgreen"; /* Background */
    context.fillRect(0, 0, 16 * box, 16 * box); /* Desenha o retângulo do jogo. Parâmetros: X, Y, Altura, LARGURA. */
}

function criarCobrinha(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green"; /* cor da cobra */
        context.fillRect(snake[i].x, snake[i].y, box, box);/* tamanho da Cobrinha */
    }
}

function drawFood(){
    context.fillStyle = "red";/* Cor da comida = vermelho */
    context.fillRect(food.x, food.y, box, box);/* Cordenadas da posição da comida */
}

// O evento Listener vai pegar o evento de click 'keydown' e chamar a função 'update'
document.addEventListener('keydown', update);

// Definindo teclas de direção
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

// Funçao que será chamado pelo 'setInterval' atualizando o jogo
// fazendo a cobrinha ardar
function iniciarJogo(){

    // Caso a snake na posição x for maior que o tamanho do canvas sendo
    // na direção direita, a posição da cobrinha em x será 0. dessa forma,
    // ela aparecerá no outro lado do canvas  
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    // Verifica se a posição da cabeça da cobrinha se choca com (i) o corpo, caso ocorra, o jogo deve parar
    // e em seguida exibir um alert c/ uma mensagem
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[1].x && snake[0].y == snake[i].y){
            clearInterval(jogo);// função parar jogo
            alert('Game Over :-(');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    /* cordenadas x e y do ponto de partida da cobra */
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* Cordenadas de direção da cobrinha no eixo X, Y*/
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeX += box;

    // Caso snakeX seja diferente de food.x OU snakeY seja diferente de food.y,
    // será retirado o último elemento da cobrinha.
    // Caso contrário, será acrescentado 1 elemento a cobrinha e rodará novamente
    // uma função q/ irá gerar um número em posição aleatório
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();// a função pop() retira o último elemento do array
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    /* Nova cabeça da cobra*/
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    /* Método unshift: acrescenta um elemento na frente do primeiro elemento */
    snake.unshift(newHead);

}

// Intervalo inicial de 100 milisegundos.
// A função setInterval chama a função 'IniciarJogo' a cada 100 milisegundos,
// fazendo a cobrinha se mover
let jogo = setInterval(iniciarJogo, 130);