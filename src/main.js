// Wait for LittleJS to load before initializing game components
function waitForLittleJS() {
    return new Promise((resolve) => {
        if (typeof engineInit !== 'undefined') {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (typeof engineInit !== 'undefined') {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 50);
        }
    });
}

import './game/Grid.js'
import './game/Piece.js' 
import './game/GameLogic.js'
import './ui/UI.js'

const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600
const GRID_WIDTH = 10
const GRID_HEIGHT = 20
const CELL_SIZE = 24

let gameGrid
let currentPiece
let gameLogic
let ui
let gameState = 'playing'

function gameInit() {
    setCameraScale(1)
    
    gameGrid = new Grid(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE)
    gameLogic = new GameLogic()
    ui = new UI()
    
    spawnNewPiece()
    
    setCanvasSize(vec2(CANVAS_WIDTH, CANVAS_HEIGHT))
}

function gameUpdate() {
    if (gameState !== 'playing') return
    
    handleInput()
    gameLogic.update()
    
    if (gameLogic.shouldDropPiece()) {
        if (!movePiece(0, 1)) {
            placePiece()
            spawnNewPiece()
        }
    }
    
    gameGrid.update()
}

function gameUpdatePost() {
    
}

function gameRender() {
    gameGrid.render()
    if (currentPiece) {
        currentPiece.render()
    }
}

function gameRenderPost() {
    ui.render(gameLogic.getScore(), gameLogic.getLevel(), gameLogic.getLines())
}

function handleInput() {
    if (keyWasPressed('ArrowLeft') || keyWasPressed('KeyA')) {
        movePiece(-1, 0)
    }
    if (keyWasPressed('ArrowRight') || keyWasPressed('KeyD')) {
        movePiece(1, 0)
    }
    if (keyWasPressed('ArrowDown') || keyWasPressed('KeyS')) {
        if (!movePiece(0, 1)) {
            placePiece()
            spawnNewPiece()
        }
    }
    if (keyWasPressed('ArrowUp') || keyWasPressed('KeyW') || keyWasPressed('Space')) {
        rotatePiece()
    }
}

function movePiece(dx, dy) {
    if (!currentPiece) return false
    
    const newX = currentPiece.x + dx
    const newY = currentPiece.y + dy
    
    if (gameGrid.canPlacePiece(currentPiece, newX, newY)) {
        currentPiece.x = newX
        currentPiece.y = newY
        return true
    }
    return false
}

function rotatePiece() {
    if (!currentPiece) return
    
    const rotated = currentPiece.getRotated()
    if (gameGrid.canPlacePiece(rotated, currentPiece.x, currentPiece.y)) {
        currentPiece.rotate()
    }
}

function placePiece() {
    if (!currentPiece) return
    
    gameGrid.placePiece(currentPiece)
    
    const linesCleared = gameGrid.clearFullLines()
    if (linesCleared > 0) {
        gameLogic.addScore(linesCleared)
    }
    
    if (gameGrid.isGameOver()) {
        gameState = 'gameOver'
        gameLogic.gameOver()
    }
}

function spawnNewPiece() {
    currentPiece = new Piece(Math.floor(GRID_WIDTH / 2), 0)
    
    if (!gameGrid.canPlacePiece(currentPiece, currentPiece.x, currentPiece.y)) {
        gameState = 'gameOver'
        gameLogic.gameOver()
    }
}

// Initialize game after LittleJS loads
waitForLittleJS().then(() => {
    engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost)
})