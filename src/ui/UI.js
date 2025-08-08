class UI {
    constructor() {
        this.font = 'Monaco, Menlo, monospace'
        this.fontSize = 16
        this.glitchOffset = vec2(0, 0)
        
        this.colors = {
            terminal: new Color(0.2, 1, 0.2, 1), // green
            data: new Color(0.2, 1, 1, 1), // cyan
            virus: new Color(1, 0.2, 0.2, 1), // red
            warning: new Color(1, 1, 0.2, 1), // yellow
            background: new Color(0, 0, 0.07, 0.8) // dark blue
        }
        
        this.panels = {
            score: { pos: vec2(500, 100), size: vec2(180, 120) },
            next: { pos: vec2(500, 250), size: vec2(180, 100) },
            status: { pos: vec2(500, 380), size: vec2(180, 150) }
        }
    }
    
    render(score, level, lines) {
        this.renderScorePanel(score, level, lines)
        this.renderStatusPanel(level)
        this.renderInstructions()
        this.renderTitle()
    }
    
    renderPanel(panel, title) {
        // Panel background
        drawRect(panel.pos, panel.size, this.colors.background)
        
        // Panel border with glow
        const borderColor = this.colors.data
        drawRectOutline(panel.pos, panel.size, borderColor, 1)
        drawRectOutline(panel.pos, panel.size.scale(1.02), 
                       new Color(borderColor.r, borderColor.g, borderColor.b, 0.3), 1)
        
        // Title
        if (title) {
            const titlePos = vec2(panel.pos.x, panel.pos.y - panel.size.y/2 + 20)
            this.drawGlowText(title, titlePos, this.colors.data, this.fontSize)
        }
    }
    
    renderScorePanel(score, level, lines) {
        const panel = this.panels.score
        this.renderPanel(panel, 'SYSTEM STATUS')
        
        const startY = panel.pos.y - panel.size.y/2 + 40
        const lineHeight = 20
        
        // Score
        this.drawGlowText('SCORE', vec2(panel.pos.x, startY), this.colors.terminal, 12)
        this.drawGlowText(this.formatNumber(score), vec2(panel.pos.x, startY + lineHeight), 
                         this.colors.terminal, 14)
        
        // Level
        this.drawGlowText('LEVEL', vec2(panel.pos.x, startY + lineHeight * 2.5), this.colors.data, 12)
        this.drawGlowText(level.toString(), vec2(panel.pos.x, startY + lineHeight * 3.5), 
                         this.colors.data, 14)
        
        // Lines
        this.drawGlowText('LINES', vec2(panel.pos.x, startY + lineHeight * 5), this.colors.terminal, 12)
        this.drawGlowText(lines.toString(), vec2(panel.pos.x, startY + lineHeight * 6), 
                         this.colors.terminal, 14)
    }
    
    renderStatusPanel(level) {
        const panel = this.panels.status
        this.renderPanel(panel, 'NETWORK STATUS')
        
        const startY = panel.pos.y - panel.size.y/2 + 40
        const lineHeight = 18
        
        // Connection status
        const connectionStatus = level > 5 ? 'UNSTABLE' : 'STABLE'
        const connectionColor = level > 5 ? this.colors.warning : this.colors.terminal
        this.drawGlowText('CONNECTION:', vec2(panel.pos.x, startY), this.colors.terminal, 10)
        this.drawGlowText(connectionStatus, vec2(panel.pos.x, startY + lineHeight), connectionColor, 12)
        
        // Firewall status
        this.drawGlowText('FIREWALL:', vec2(panel.pos.x, startY + lineHeight * 2.5), this.colors.terminal, 10)
        const firewallStatus = (level % 10 === 0 && level > 0) ? 'CHALLENGE' : 'ACTIVE'
        const firewallColor = (level % 10 === 0 && level > 0) ? this.colors.virus : this.colors.terminal
        this.drawGlowText(firewallStatus, vec2(panel.pos.x, startY + lineHeight * 3.5), firewallColor, 12)
        
        // System integrity
        const integrity = Math.max(50, 100 - level * 2)
        this.drawGlowText('INTEGRITY:', vec2(panel.pos.x, startY + lineHeight * 5), this.colors.terminal, 10)
        const integrityColor = integrity < 70 ? this.colors.virus : this.colors.terminal
        this.drawGlowText(`${integrity}%`, vec2(panel.pos.x, startY + lineHeight * 6), integrityColor, 12)
        
        // High score
        const highScore = parseInt(localStorage.getItem('voidBlocksHighScore') || '0')
        if (highScore > 0) {
            this.drawGlowText('HIGH SCORE:', vec2(panel.pos.x, startY + lineHeight * 7.5), this.colors.data, 10)
            this.drawGlowText(this.formatNumber(highScore), vec2(panel.pos.x, startY + lineHeight * 8.5), 
                             this.colors.data, 12)
        }
    }
    
    renderInstructions() {
        const instructionPanel = { pos: vec2(400, 520), size: vec2(360, 80) }
        this.renderPanel(instructionPanel, null)
        
        const instructions = [
            'ARROW KEYS / WASD - MOVE',
            'SPACE / UP - ROTATE',
            'ESC - PAUSE SYSTEM'
        ]
        
        const startY = instructionPanel.pos.y - instructionPanel.size.y/2 + 15
        instructions.forEach((instruction, index) => {
            this.drawGlowText(instruction, vec2(instructionPanel.pos.x, startY + index * 18), 
                             this.colors.terminal, 10)
        })
    }
    
    renderTitle() {
        // Main title
        const titlePos = vec2(400, 30)
        this.drawGlowText('VOID BLOCKS', titlePos, this.colors.data, 24, true)
        
        // Subtitle
        const subtitlePos = vec2(400, 50)
        this.drawGlowText('NEURAL NETWORK SECURITY PROTOCOL', subtitlePos, this.colors.terminal, 10)
        
        // Version
        const versionPos = vec2(780, 580)
        this.drawGlowText('v1.0.0', versionPos, new Color(0.3, 0.3, 0.3, 1), 8)
    }
    
    drawGlowText(text, position, color, size = 16, bold = false) {
        // Apply glitch effect for certain text
        let renderPos = position
        if (color === this.colors.virus || color === this.colors.warning) {
            this.glitchOffset = vec2(
                Math.sin(time * 20) * 2,
                Math.cos(time * 15) * 1
            )
            renderPos = position.add(this.glitchOffset)
        }
        
        // Glow effect - draw text multiple times with decreasing alpha
        const glowSteps = 3
        for (let i = glowSteps; i >= 0; i--) {
            const glowColor = new Color(color.r, color.g, color.b, color.a * (i / glowSteps) * 0.3)
            const offset = vec2(i, i)
            
            // LittleJS text rendering
            drawText(text, renderPos.add(offset), size, glowColor, 0, undefined, 'center')
        }
        
        // Main text
        drawText(text, renderPos, size, color, 0, undefined, 'center')
    }
    
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    
    renderGameOver(score, level, lines, isHighScore) {
        // Game over overlay
        const overlayColor = new Color(0, 0, 0, 0.8)
        drawRect(vec2(400, 300), vec2(800, 600), overlayColor)
        
        // Game over text with heavy glitch
        const gameOverPos = vec2(400, 200)
        this.drawGlowText('SYSTEM COMPROMISED', gameOverPos, this.colors.virus, 28, true)
        
        const finalStatsPos = vec2(400, 280)
        this.drawGlowText('FINAL STATISTICS', finalStatsPos, this.colors.data, 18)
        
        const statsStart = 320
        this.drawGlowText(`SCORE: ${this.formatNumber(score)}`, vec2(400, statsStart), this.colors.terminal, 16)
        this.drawGlowText(`LEVEL: ${level}`, vec2(400, statsStart + 25), this.colors.terminal, 16)
        this.drawGlowText(`LINES: ${lines}`, vec2(400, statsStart + 50), this.colors.terminal, 16)
        
        if (isHighScore) {
            this.drawGlowText('NEW HIGH SCORE!', vec2(400, statsStart + 85), this.colors.warning, 18, true)
        }
        
        this.drawGlowText('PRESS R TO RESTART', vec2(400, 480), this.colors.data, 16)
    }
}

window.UI = UI