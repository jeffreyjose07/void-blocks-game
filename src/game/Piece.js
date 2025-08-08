const TETRIS_SHAPES = [
    // I-piece
    [
        [1, 1, 1, 1]
    ],
    // O-piece
    [
        [1, 1],
        [1, 1]
    ],
    // T-piece
    [
        [0, 1, 0],
        [1, 1, 1]
    ],
    // S-piece
    [
        [0, 1, 1],
        [1, 1, 0]
    ],
    // Z-piece
    [
        [1, 1, 0],
        [0, 1, 1]
    ],
    // J-piece
    [
        [1, 0, 0],
        [1, 1, 1]
    ],
    // L-piece
    [
        [0, 0, 1],
        [1, 1, 1]
    ]
]

class Piece {
    constructor(x, y, shapeIndex = null) {
        this.x = x
        this.y = y
        this.shapeIndex = shapeIndex !== null ? shapeIndex : Math.floor(Math.random() * TETRIS_SHAPES.length)
        this.shape = JSON.parse(JSON.stringify(TETRIS_SHAPES[this.shapeIndex]))
        this.type = this.getRandomType()
        this.rotation = 0
        this.gridOffset = vec2(100, 50)
        this.cellSize = 24
        
        this.colors = {
            1: new Color(0.2, 1, 0.2, 1), // green - standard block
            2: new Color(0.2, 1, 1, 1), // cyan - data fragment
            3: new Color(1, 0.2, 1, 1), // magenta - special
            4: new Color(1, 0.2, 0.2, 1), // red - virus
            5: new Color(1, 1, 0.2, 1), // yellow - power-up
        }
    }
    
    getRandomType() {
        const weights = [60, 20, 10, 5, 5] // Standard, data fragment, special, virus, power-up
        const random = Math.random() * 100
        let accumulated = 0
        
        for (let i = 0; i < weights.length; i++) {
            accumulated += weights[i]
            if (random <= accumulated) {
                return i + 1
            }
        }
        return 1 // fallback to standard
    }
    
    render() {
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    const pos = vec2(
                        this.gridOffset.x + (this.x + x) * this.cellSize,
                        this.gridOffset.y + (this.y + y) * this.cellSize
                    )
                    
                    let color = this.colors[this.type]
                    
                    // Add special effects for different types
                    if (this.type === 2) { // Data fragment - cyan glow
                        const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 4)
                        color = new Color(0.2 * pulseIntensity, 1 * pulseIntensity, 1 * pulseIntensity, 1)
                    } else if (this.type === 4) { // Virus - glitch effect
                        const glitchOffset = vec2(
                            Math.sin(time * 15) * 1,
                            Math.cos(time * 12) * 1
                        )
                        pos.x += glitchOffset.x
                        pos.y += glitchOffset.y
                    } else if (this.type === 5) { // Power-up - sparkle effect
                        const sparkle = 0.7 + 0.3 * Math.sin(time * 8)
                        color = new Color(1 * sparkle, 1 * sparkle, 0.2 * sparkle, 1)
                    }
                    
                    // Draw main block
                    drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                            vec2(this.cellSize-2, this.cellSize-2), color)
                    
                    // Add glow effect
                    const glowColor = new Color(color.r, color.g, color.b, 0.3)
                    drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                            vec2(this.cellSize+1, this.cellSize+1), glowColor)
                    
                    // Add inner highlight
                    const highlightColor = new Color(
                        Math.min(1, color.r + 0.3),
                        Math.min(1, color.g + 0.3), 
                        Math.min(1, color.b + 0.3),
                        0.5
                    )
                    drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                            vec2(this.cellSize/2, this.cellSize/2), highlightColor)
                }
            }
        }
    }
    
    rotate() {
        this.shape = this.rotateMatrix(this.shape)
        this.rotation = (this.rotation + 1) % 4
    }
    
    getRotated() {
        const rotatedPiece = new Piece(this.x, this.y, this.shapeIndex)
        rotatedPiece.shape = this.rotateMatrix(this.shape)
        rotatedPiece.type = this.type
        rotatedPiece.rotation = (this.rotation + 1) % 4
        return rotatedPiece
    }
    
    rotateMatrix(matrix) {
        const rows = matrix.length
        const cols = matrix[0].length
        const rotated = Array(cols).fill().map(() => Array(rows).fill(0))
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = matrix[i][j]
            }
        }
        
        return rotated
    }
    
    getGhostPosition(grid) {
        let ghostY = this.y
        while (grid.canPlacePiece(this, this.x, ghostY + 1)) {
            ghostY++
        }
        return ghostY
    }
    
    renderGhost(grid) {
        const ghostY = this.getGhostPosition(grid)
        if (ghostY === this.y) return // Don't render if ghost is at current position
        
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x]) {
                    const pos = vec2(
                        this.gridOffset.x + (this.x + x) * this.cellSize,
                        this.gridOffset.y + (ghostY + y) * this.cellSize
                    )
                    
                    const ghostColor = new Color(0.5, 0.5, 0.5, 0.3)
                    drawRectOutline(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                                   vec2(this.cellSize-2, this.cellSize-2), ghostColor, 1)
                }
            }
        }
    }
}

window.Piece = Piece