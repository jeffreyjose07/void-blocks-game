# VOID BLOCKS

A cyberpunk-inspired Tetris variant where you manipulate data fragments to prevent system corruption in a virtual reality network.

## 🎮 Game Features

- **Classic Tetris Gameplay** with cyberpunk twist
- **Virus Blocks** that spread and corrupt the system
- **Data Fragments** with special power-ups and abilities
- **Firewall Challenges** - intense speed rounds every 10 levels
- **System Corruption** mechanics with visual glitch effects
- **Terminal Aesthetic** with neon glow effects and scanlines
- **Progressive Difficulty** with increasing corruption levels
- **High Score System** with local storage

## 🎯 Unique Mechanics

### Block Types
- **Standard Blocks** (Green) - Basic building blocks
- **Data Fragments** (Cyan) - Slow time when cleared, pulse effect
- **Special Blocks** (Magenta) - Bonus points and effects
- **Virus Blocks** (Red) - Spread to adjacent blocks, glitch effects
- **Power-ups** (Yellow) - Clear all virus blocks, sparkle effect

### Game Modes
- **Standard Mode** - Progressive difficulty increase
- **Firewall Challenge** - Every 10 levels, 3x speed for 10 seconds
- **System Corruption** - Visual effects increase with virus spread

## 🕹️ Controls

- **Arrow Keys** or **WASD** - Move pieces
- **Up Arrow** or **Space** - Rotate pieces
- **Down Arrow** or **S** - Soft drop
- **ESC** - Pause (planned feature)

## 🛠️ Technical Details

- **Engine**: LittleJS (7KB lightweight game engine)
- **Build Tool**: Vite
- **Rendering**: WebGL with Canvas fallback
- **Performance**: 60fps, optimized for mobile and desktop
- **Bundle Size**: <50KB total
- **Browser Support**: Modern browsers with Canvas/WebGL

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