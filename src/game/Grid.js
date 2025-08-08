class Grid {
    constructor(width, height, cellSize) {
        this.width = width
        this.height = height
        this.cellSize = cellSize
        this.cells = Array(height).fill().map(() => Array(width).fill(0))
        this.virusCells = Array(height).fill().map(() => Array(width).fill(false))
        this.virusSpreadTimer = 0
        this.virusSpreadDelay = 180 // 3 seconds at 60fps
        
        this.colors = {
            0: new Color(0, 0, 0, 0), // empty
            1: new Color(0.2, 1, 0.2, 1), // green - standard block
            2: new Color(0.2, 1, 1, 1), // cyan - data fragment
            3: new Color(1, 0.2, 1, 1), // magenta - special
            4: new Color(1, 0.2, 0.2, 1), // red - virus
            5: new Color(1, 1, 0.2, 1), // yellow - power-up
        }
        
        this.gridOffset = vec2(100, 50)
    }
    
    update() {
        this.updateVirusSpread()
    }
    
    updateVirusSpread() {
        this.virusSpreadTimer++
        if (this.virusSpreadTimer >= this.virusSpreadDelay) {
            this.spreadVirus()
            this.virusSpreadTimer = 0
        }
    }
    
    spreadVirus() {
        const newVirusCells = this.virusCells.map(row => [...row])
        
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.virusCells[y][x]) {
                    // Spread to adjacent cells
                    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
                    directions.forEach(([dx, dy]) => {
                        const newX = x + dx
                        const newY = y + dy
                        if (this.isValidPosition(newX, newY) && 
                            this.cells[newY][newX] > 0 && 
                            !this.virusCells[newY][newX] &&
                            Math.random() < 0.3) { // 30% chance to spread
                            newVirusCells[newY][newX] = true
                            this.cells[newY][newX] = 4 // Convert to virus block
                        }
                    })
                }
            }
        }
        
        this.virusCells = newVirusCells
    }
    
    render() {
        // Draw grid background
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const pos = vec2(
                    this.gridOffset.x + x * this.cellSize,
                    this.gridOffset.y + y * this.cellSize
                )
                
                // Grid outline
                const gridColor = new Color(0.1, 0.4, 0.1, 0.3)
                drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                        vec2(this.cellSize-1, this.cellSize-1), gridColor)
                
                // Cell content
                if (this.cells[y][x] > 0) {
                    let cellColor = this.colors[this.cells[y][x]]
                    
                    // Add virus glow effect
                    if (this.virusCells[y][x]) {
                        cellColor = new Color(1, 0.2, 0.2, 0.9)
                        // Glitch effect for virus blocks
                        const glitchOffset = vec2(
                            (Math.sin(time * 10) * 2), 
                            (Math.cos(time * 8) * 1)
                        )
                        drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)).add(glitchOffset), 
                                vec2(this.cellSize-2, this.cellSize-2), cellColor)
                    } else {
                        drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                                vec2(this.cellSize-2, this.cellSize-2), cellColor)
                    }
                    
                    // Add glow effect
                    const glowColor = new Color(cellColor.r, cellColor.g, cellColor.b, 0.3)
                    drawRect(pos.add(vec2(this.cellSize/2, this.cellSize/2)), 
                            vec2(this.cellSize+2, this.cellSize+2), glowColor)
                }
            }
        }
        
        // Draw grid border
        const borderColor = new Color(0.2, 1, 1, 1)
        const borderPos = vec2(this.gridOffset.x + this.width * this.cellSize / 2,
                              this.gridOffset.y + this.height * this.cellSize / 2)
        const borderSize = vec2(this.width * this.cellSize + 4, this.height * this.cellSize + 4)
        drawRectOutline(borderPos, borderSize, borderColor, 2)
    }
    
    canPlacePiece(piece, x, y) {
        const shape = piece.shape
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (shape[py][px]) {
                    const worldX = x + px
                    const worldY = y + py
                    
                    if (!this.isValidPosition(worldX, worldY) || 
                        this.cells[worldY][worldX] !== 0) {
                        return false
                    }
                }
            }
        }
        return true
    }
    
    placePiece(piece) {
        const shape = piece.shape
        
        for (let py = 0; py < shape.length; py++) {
            for (let px = 0; px < shape[py].length; px++) {
                if (shape[py][px]) {
                    const worldX = piece.x + px
                    const worldY = piece.y + py
                    
                    if (this.isValidPosition(worldX, worldY)) {
                        this.cells[worldY][worldX] = piece.type
                        
                        // Random chance to spawn virus blocks
                        if (Math.random() < 0.1) { // 10% chance
                            this.virusCells[worldY][worldX] = true
                            this.cells[worldY][worldX] = 4
                        }
                    }
                }
            }
        }
    }
    
    clearFullLines() {
        let linesCleared = 0
        
        for (let y = this.height - 1; y >= 0; y--) {
            if (this.isLineFull(y)) {
                this.clearLine(y)
                linesCleared++
                y++ // Check the same line again since lines shifted down
            }
        }
        
        return linesCleared
    }
    
    isLineFull(y) {
        return this.cells[y].every(cell => cell !== 0)
    }
    
    clearLine(y) {
        // Remove the line
        this.cells.splice(y, 1)
        this.virusCells.splice(y, 1)
        
        // Add new empty line at top
        this.cells.unshift(Array(this.width).fill(0))
        this.virusCells.unshift(Array(this.width).fill(false))
    }
    
    isValidPosition(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height
    }
    
    isGameOver() {
        // Check if any block in the top row
        return this.cells[0].some(cell => cell !== 0)
    }
}

window.Grid = Grid