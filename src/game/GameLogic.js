class GameLogic {
    constructor() {
        this.score = 0
        this.lines = 0
        this.level = 1
        this.dropTimer = 0
        this.dropDelay = 60 // 1 second at 60fps
        this.baseDropDelay = 60
        this.firewallMode = false
        this.firewallTimer = 0
        this.firewallDuration = 600 // 10 seconds
        this.systemCorruption = 0
        this.maxCorruption = 100
        
        this.scoreMultipliers = {
            1: 40,   // Single line
            2: 100,  // Double
            3: 300,  // Triple  
            4: 1200  // Tetris
        }
        
        this.glitchIntensity = 0
    }
    
    update() {
        this.updateDrop()
        this.updateFirewall()
        this.updateSystemCorruption()
        this.updateLevel()
    }
    
    updateDrop() {
        this.dropTimer++
    }
    
    shouldDropPiece() {
        if (this.dropTimer >= this.dropDelay) {
            this.dropTimer = 0
            return true
        }
        return false
    }
    
    updateFirewall() {
        // Every 10 levels, activate firewall mode
        if (this.level % 10 === 0 && this.level > 0 && !this.firewallMode) {
            this.activateFirewall()
        }
        
        if (this.firewallMode) {
            this.firewallTimer++
            if (this.firewallTimer >= this.firewallDuration) {
                this.deactivateFirewall()
            }
        }
    }
    
    activateFirewall() {
        this.firewallMode = true
        this.firewallTimer = 0
        this.dropDelay = Math.max(10, this.dropDelay / 3) // Triple speed
        console.log('FIREWALL CHALLENGE ACTIVATED!')
    }
    
    deactivateFirewall() {
        this.firewallMode = false
        this.firewallTimer = 0
        this.dropDelay = this.baseDropDelay
        console.log('Firewall challenge completed')
    }
    
    updateSystemCorruption() {
        // Gradually increase system corruption based on virus blocks
        if (this.systemCorruption > 0) {
            this.systemCorruption = Math.max(0, this.systemCorruption - 0.1)
        }
        
        // Update glitch effects based on corruption
        this.glitchIntensity = this.systemCorruption / this.maxCorruption
    }
    
    updateLevel() {
        const newLevel = Math.floor(this.lines / 10) + 1
        if (newLevel !== this.level) {
            this.level = newLevel
            this.updateDropSpeed()
        }
    }
    
    updateDropSpeed() {
        // Exponential speed increase
        this.baseDropDelay = Math.max(3, Math.floor(60 * Math.pow(0.8, this.level - 1)))
        if (!this.firewallMode) {
            this.dropDelay = this.baseDropDelay
        }
    }
    
    addScore(linesCleared) {
        if (linesCleared > 0 && linesCleared <= 4) {
            let points = this.scoreMultipliers[linesCleared] * this.level
            
            // Bonus for clearing during firewall mode
            if (this.firewallMode) {
                points *= 2
            }
            
            this.score += points
            this.lines += linesCleared
            
            // Reduce system corruption when clearing lines
            this.systemCorruption = Math.max(0, this.systemCorruption - linesCleared * 5)
        }
    }
    
    addVirusCorruption(amount) {
        this.systemCorruption = Math.min(this.maxCorruption, this.systemCorruption + amount)
        
        if (this.systemCorruption >= this.maxCorruption) {
            this.triggerSystemFailure()
        }
    }
    
    triggerSystemFailure() {
        console.log('SYSTEM FAILURE - CORRUPTION AT MAXIMUM!')
        // Could trigger game over or special recovery mode
    }
    
    activateDataFragment() {
        // Slow time effect for 3 seconds
        this.dropDelay *= 2
        setTimeout(() => {
            this.dropDelay = this.firewallMode ? this.baseDropDelay / 3 : this.baseDropDelay
        }, 3000)
        
        console.log('Data fragment activated - Time slowed!')
    }
    
    clearVirusBlocks(grid) {
        // Clear all virus blocks on the grid
        for (let y = 0; y < grid.height; y++) {
            for (let x = 0; x < grid.width; x++) {
                if (grid.virusCells[y][x]) {
                    grid.cells[y][x] = 0
                    grid.virusCells[y][x] = false
                }
            }
        }
        
        this.systemCorruption = Math.max(0, this.systemCorruption - 20)
        console.log('All virus blocks cleared!')
    }
    
    gameOver() {
        console.log('Game Over!')
        console.log(`Final Score: ${this.score}`)
        console.log(`Lines Cleared: ${this.lines}`)
        console.log(`Level Reached: ${this.level}`)
        
        // Store high score in localStorage
        const highScore = localStorage.getItem('voidBlocksHighScore') || 0
        if (this.score > highScore) {
            localStorage.setItem('voidBlocksHighScore', this.score.toString())
            console.log('New high score!')
        }
    }
    
    getScore() {
        return this.score
    }
    
    getLevel() {
        return this.level
    }
    
    getLines() {
        return this.lines
    }
    
    getSystemCorruption() {
        return this.systemCorruption
    }
    
    isFirewallActive() {
        return this.firewallMode
    }
    
    getGlitchIntensity() {
        return this.glitchIntensity
    }
    
    getHighScore() {
        return parseInt(localStorage.getItem('voidBlocksHighScore') || '0')
    }
}

window.GameLogic = GameLogic