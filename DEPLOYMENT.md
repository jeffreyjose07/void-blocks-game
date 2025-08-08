# VOID BLOCKS Deployment Guide

## Overview
This game uses GitHub Actions to automatically build and deploy to the portfolio repository whenever changes are pushed to the main branch.

## Required Setup

### 1. GitHub Personal Access Token

Create a Personal Access Token with the following permissions:
- Repository access to `jeffreyjose07.github.io`
- `repo` scope (full repository access)
- `workflow` scope (to trigger workflows)

**Steps:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Create a new token with:
   - **Expiration**: 1 year or custom
   - **Repository access**: Selected repositories → `jeffreyjose07/jeffreyjose07.github.io`
   - **Repository permissions**:
     - Contents: Write
     - Metadata: Read
     - Pull requests: Write
     - Actions: Write
     - Pages: Write

### 2. Add Secret to void-blocks-game Repository

1. Go to `jeffreyjose07/void-blocks-game` → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `PORTFOLIO_DEPLOY_TOKEN`
4. Value: [Your Personal Access Token]

## Deployment Workflow

### Automatic Deployment (Recommended)
```bash
# Make changes to the game
git add .
git commit -m "Update game features"
git push origin main
```

**What happens:**
1. GitHub Actions builds the game (`npm run build`)
2. Deploys built files to `jeffreyjose07.github.io/public/games/void-blocks/`  
3. Triggers portfolio rebuild
4. Portfolio deploys to GitHub Pages
5. Game is live at `https://jeffreyjose07.github.io/games/void-blocks/`

### Manual Deployment
```bash
# Build the game
npm run build

# Copy to portfolio (if repos are side-by-side)
cp -r dist/* ../jeffreyjose07.github.io/public/games/void-blocks/

# Rebuild portfolio
cd ../jeffreyjose07.github.io
npm run build

# Commit and push
git add .
git commit -m "Update VOID BLOCKS game"
git push origin main
```

## Workflow Files

### void-blocks-game/.github/workflows/build-and-deploy.yml
- Builds game on push to main
- Deploys to portfolio repository
- Triggers portfolio rebuild via repository_dispatch

### jeffreyjose07.github.io/.github/workflows/rebuild-on-game-update.yml  
- Listens for `game-updated` events
- Rebuilds blog and portfolio
- Deploys to GitHub Pages

## Testing Deployment

### Local Testing
```bash
# Start dev server
npm run dev
# Visit http://localhost:3000

# Test production build
npm run build
npm run preview
# Visit http://localhost:4173
```

### Live Testing
1. Push changes to void-blocks-game main branch
2. Check Actions tab for build status
3. Verify deployment at `https://jeffreyjose07.github.io/games/void-blocks/`
4. Test game functionality in live environment

## Troubleshooting

### Build Fails
- Check Node.js version compatibility (using Node 18 in CI)
- Verify all dependencies are in package.json
- Test build locally: `npm run build`

### Deployment Fails
- Verify `PORTFOLIO_DEPLOY_TOKEN` secret is set correctly
- Check token permissions include repository write access
- Ensure target repository path exists: `public/games/void-blocks/`

### Portfolio Not Updating
- Check if portfolio rebuild workflow triggered
- Verify GitHub Pages is enabled on jeffreyjose07.github.io
- Check for portfolio build errors in Actions tab

### Game Not Loading
- Verify all asset paths are relative (no absolute URLs)
- Check browser console for JavaScript errors
- Ensure LittleJS CDN is accessible
- Test locally with same build

## File Structure After Deployment

```
jeffreyjose07.github.io/
├── public/
│   └── games/
│       └── void-blocks/
│           ├── index.html      # Game entry point
│           ├── game.js         # Bundled game code  
│           ├── style.css       # Terminal styles
│           └── screenshot.png  # Portfolio thumbnail
└── src/
    └── components/
        └── Projects.tsx        # Contains VOID BLOCKS entry
```

## Security Notes

- Personal Access Token should be treated as a password
- Token is stored securely in GitHub Secrets
- Regular token rotation recommended (annually)
- Never commit tokens to code repositories

## Performance Monitoring

- Bundle size target: <50KB total
- Load time target: <2 seconds on 3G
- 60fps gameplay maintained on mobile devices
- WebGL with Canvas fallback for compatibility