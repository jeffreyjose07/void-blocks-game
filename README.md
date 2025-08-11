# VOID BLOCKS

A cyberpunk-inspired Tetris variant where you manipulate data fragments to prevent system corruption in a virtual reality network.

## 🎮 Game Features

- **Classic Tetris Gameplay** with cyberpunk twist
- **Virus Blocks** that spread and corrupt adjacent blocks over time
- **Multiple Block Types** with unique visual effects and behaviors
- **Firewall Challenges** - 3x speed rounds triggered every 10 levels
- **System Corruption** mechanics with dynamic visual feedback
- **Terminal Aesthetic** with neon glow effects and monospace typography
- **Progressive Difficulty** with exponential speed increase
- **High Score System** with localStorage persistence

## 🎯 Unique Mechanics

### Block Types
- **Standard Blocks** (Green) - Basic building blocks with terminal glow
- **Data Fragments** (Cyan) - Pulsing cyan blocks that slow time when cleared
- **Special Blocks** (Magenta) - Bonus points and enhanced effects
- **Virus Blocks** (Red) - Spread to adjacent blocks with glitch animations
- **Power-ups** (Yellow) - Sparkle effect, clears all virus blocks when activated

### Game Systems
- **Virus Spreading** - 30% chance every 3 seconds to infect adjacent blocks
- **Firewall Challenge** - Triggered at level multiples of 10, lasts 10 seconds
- **System Corruption** - Tracked numerically, affects visual glitch intensity
- **Time Manipulation** - Data fragments slow game speed by 50% for 3 seconds

## 🕹️ Controls

- **Arrow Keys** or **WASD** - Move pieces
- **Up Arrow** or **Space** - Rotate pieces
- **Down Arrow** or **S** - Soft drop (accelerated fall)

## 🛠️ Technical Implementation

- **Engine**: LittleJS 1.8.0 (loaded from CDN)
- **Build Tool**: Vite for development and production builds
- **Rendering**: LittleJS WebGL renderer with Canvas fallback
- **Performance**: Consistent 60fps with optimized draw calls
- **Architecture**: Modular ES6 classes (Grid, Piece, GameLogic, UI)
- **Bundle Size**: Minimal footprint with CDN dependencies

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎨 Visual Design

The game features a terminal-inspired cyberpunk aesthetic with:
- **Color Palette**: Terminal green (#55ff55), cyber cyan (#55ffff), neon magenta (#ff55ff)
- **Typography**: Monaco/Menlo monospace fonts
- **Effects**: Glow effects, glitch animations, scanlines, matrix-style background
- **UI**: Minimal terminal panels with system status information

## 📱 Mobile Support

- Responsive design that scales to mobile devices
- Touch-friendly controls (planned)
- Optimized performance for mobile browsers

## 🏆 Scoring System

- **Single Line**: 40 × level
- **Double Lines**: 100 × level  
- **Triple Lines**: 300 × level
- **Tetris**: 1200 × level
- **Firewall Bonus**: 2x multiplier during challenges
- **Virus Clearing**: Reduces system corruption

## 🎵 Audio (Planned)

- Cyberpunk ambient soundtrack
- Terminal sound effects
- Glitch audio for virus blocks
- System alerts for firewall challenges

## 🚀 Deployment

This game uses automated deployment via GitHub Actions:

### Workflow Overview
1. **Push to main branch** → Triggers build and deployment
2. **Game builds** → Vite creates optimized production bundle
3. **Deploy to portfolio** → Files copied to `jeffreyjose07.github.io/public/games/void-blocks/`
4. **Portfolio rebuilds** → Portfolio site rebuilds with updated game
5. **Live on GitHub Pages** → Game accessible at [live portfolio URL]

### Required Secrets
- `PORTFOLIO_DEPLOY_TOKEN`: Personal access token for cross-repository deployment

### Manual Deployment
```bash
npm run build
cp -r dist/* ../jeffreyjose07.github.io/public/games/void-blocks/
cd ../jeffreyjose07.github.io
npm run build
```

## 📋 Roadmap

- [ ] Audio system implementation
- [ ] Touch controls for mobile
- [ ] Pause functionality
- [ ] Settings menu
- [ ] Additional visual effects
- [ ] Particle systems
- [ ] Background animations

## 🤝 Contributing

This is a showcase project demonstrating game development skills with modern web technologies. The game is designed to be lightweight, performant, and visually striking.

## 📄 License

MIT License - See LICENSE file for details.

---

**VOID BLOCKS** - Neural Network Security Protocol v1.0.0