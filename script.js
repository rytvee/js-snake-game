const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// --- Game settings ---
let gridSizeX = 20;
let gridSizeY = 20;
let tileSize = 20;
let offsetX = 0;
let offsetY = 0;

let snake = [];
let food = {x:5, y:5};
let dx=1, dy=0;

let score = 0;
let level = 1;
let speed = 500;
let game;
let paused = false;
let gameOver = false;
let winner = false;
let restartButtonArea = null;

// --- Pause/Play SVG icons ---
const pauseIconSVG = new Image();
pauseIconSVG.src = 'data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="12" y="12" width="12" height="40"/><rect x="40" y="12" width="12" height="40"/></svg>';

const playIconSVG = new Image();
playIconSVG.src = 'data:image/svg+xml;utf8,<svg fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="16,12 52,32 16,52"/></svg>';

// --- Resize canvas ---
function resizeCanvas(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Adjust vertical tiles for mobile
    gridSizeY = (screenWidth < 768) ? 30 : 20;

    canvas.width = screenWidth * 0.9;
    canvas.height = screenHeight * 0.85;

    tileSize = Math.min(canvas.width / gridSizeX, canvas.height / gridSizeY);

    offsetX = (canvas.width - tileSize*gridSizeX)/2;
    offsetY = (canvas.height - tileSize*gridSizeY)/2;
}

// --- Initialize game ---
function initGame(){
    snake = [
        {x: Math.floor(gridSizeX/2), y: Math.floor(gridSizeY/2)},
        {x: Math.floor(gridSizeX/2)-1, y: Math.floor(gridSizeY/2)},
        {x: Math.floor(gridSizeX/2)-2, y: Math.floor(gridSizeY/2)}
    ];

    // RESET DIRECTION
    dx = 1;
    dy = 0;

    spawnFood();
    score=0;
    level=1;
    speed=500;
    gameOver=false;
    winner=false;
    paused=false;

    clearInterval(game);
    game = setInterval(gameLoop, speed);
}
// --- Spawn food ---
function spawnFood(){
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random()*gridSizeX),
            y: Math.floor(Math.random()*gridSizeY)
        };
    } while(snake.some(seg => seg.x===newFood.x && seg.y===newFood.y));
    food = newFood;
}

// --- Move snake ---
function moveSnake(){
    if(gameOver || paused) return;

    const head = {x: snake[0].x + dx, y: snake[0].y + dy};

    // Wall collision
    if(head.x<0 || head.x>=gridSizeX || head.y<0 || head.y>=gridSizeY){
        gameOver=true;
        clearInterval(game);
        return;
    }

    // Self collision
    if(snake.some(seg => seg.x===head.x && seg.y===head.y)){
        gameOver=true;
        clearInterval(game);
        return;
    }

    snake.unshift(head);

    // Food collision
    if(head.x===food.x && head.y===food.y){
        score++;
        spawnFood();
        if(score % 5 === 0){
            level++;
            speed = Math.max(50, speed-25);
            if(speed===50){ gameOver=true; winner=true; clearInterval(game); }
            else { clearInterval(game); game = setInterval(gameLoop, speed); }
        }
    } else {
        snake.pop();
    }
}

// --- Draw everything ---
function drawSnake(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // --- Food ---
    ctx.fillStyle = "lime";
    ctx.fillRect(offsetX + food.x*tileSize, offsetY + food.y*tileSize, tileSize, tileSize);

    // --- Snake ---
    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i===0) ? "red":"black";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.fillRect(offsetX + snake[i].x*tileSize, offsetY + snake[i].y*tileSize, tileSize, tileSize);
        ctx.strokeRect(offsetX + snake[i].x*tileSize, offsetY + snake[i].y*tileSize, tileSize, tileSize);
    }

    // --- Score & Level ---
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = `${tileSize*0.8}px Arial`;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("Score: "+score, canvas.width-10, 10);
    ctx.fillText("Level: "+level, canvas.width-10, 10+tileSize*0.9);

    // --- Pause/Play icon ---
    if(!gameOver) drawHUDIcons();

    // --- Game Over / Winner ---
    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = `${tileSize*2}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if(winner) ctx.fillText("🎉 You Win! 🎉", canvas.width/2, canvas.height/2);
        else ctx.fillText("Game Over", canvas.width/2, canvas.height/2);

        drawRestartButton();
    }
}

// --- HUD icons ---
function drawHUDIcons(){
    const iconSize = tileSize * 1.5;
    const x = tileSize * 0.5;
    const y = tileSize * 0.2;
    if(paused) ctx.drawImage(playIconSVG, x, y, iconSize, iconSize);
    else ctx.drawImage(pauseIconSVG, x, y, iconSize, iconSize);
}

// --- Restart button ---
function drawRestartButton(){
    const btnWidth = tileSize*6;
    const btnHeight = tileSize*2;
    const btnX = canvas.width/2 - btnWidth/2;
    const btnY = canvas.height/2 + tileSize*1.5;

    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.fillRect(btnX, btnY, btnWidth, btnHeight);
    ctx.strokeRect(btnX, btnY, btnWidth, btnHeight);

    ctx.fillStyle = "black";
    ctx.font = `${tileSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Restart", canvas.width/2, btnY + btnHeight/2);

    restartButtonArea = {x:btnX, y:btnY, width:btnWidth, height:btnHeight};
}

// --- Toggle pause ---
function togglePause(){
    if(gameOver) return;
    paused = !paused;
    clearInterval(game);
    if(!paused) game = setInterval(gameLoop, speed);
    drawSnake();
}

// --- Click / touch detection ---
function handleCanvasInteraction(clientX, clientY){
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Pause/Play icon
    const iconSize = tileSize*1.5;
    const iconX = tileSize*0.5;
    const iconY = tileSize*0.2;

    if(!gameOver && x>=iconX && x<=iconX+iconSize && y>=iconY && y<=iconY+iconSize){
        togglePause();
    }

    // Restart button
    if(gameOver && restartButtonArea){
        if(
            x>=restartButtonArea.x &&
            x<=restartButtonArea.x + restartButtonArea.width &&
            y>=restartButtonArea.y &&
            y<=restartButtonArea.y + restartButtonArea.height
        ){
            initGame();
        }
    }
}
canvas.addEventListener("click",(e)=>{
    handleCanvasInteraction(e.clientX, e.clientY);
});
// --- Keyboard controls ---
document.addEventListener("keydown",(e)=>{
    if(e.key==="ArrowUp" && dy===0){ dx=0; dy=-1; }
    if(e.key==="ArrowDown" && dy===0){ dx=0; dy=1; }
    if(e.key==="ArrowLeft" && dx===0){ dx=-1; dy=0; }
    if(e.key==="ArrowRight" && dx===0){ dx=1; dy=0; }
});

// --- Mobile swipe ---
let touchStartX=0, touchStartY=0;
canvas.addEventListener("touchstart",(e)=>{
    e.preventDefault();
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
},{passive:false});
canvas.addEventListener("touchmove",(e)=>{
    e.preventDefault();
},{passive:false});
canvas.addEventListener("touchend",(e)=>{
    const touch = e.changedTouches[0];

    const dxSwipe = touch.clientX - touchStartX;
    const dySwipe = touch.clientY - touchStartY;
    const absX = Math.abs(dxSwipe);
    const absY = Math.abs(dySwipe);

    // Treat small movement as a tap
    if(Math.max(absX, absY) < 40){
        handleCanvasInteraction(touch.clientX, touch.clientY);
        return;
    }

    // If game is over, ignore swipes but allow taps
    if(gameOver) return;

    if(absX>absY){
        if(dxSwipe>0 && dx===0){ dx=1; dy=0; }
        else if(dxSwipe<0 && dx===0){ dx=-1; dy=0; }
    } 
    else{
        if(dySwipe>0 && dy===0){ dx=0; dy=1; }
        else if(dySwipe<0 && dy===0){ dx=0; dy=-1; }
    }
},{passive:false});

// --- Game loop ---
function gameLoop(){ moveSnake(); drawSnake(); }

// --- Initialize everything after page load ---
window.onload = () => {
    resizeCanvas();
    initGame();
};
window.addEventListener("resize", resizeCanvas);
