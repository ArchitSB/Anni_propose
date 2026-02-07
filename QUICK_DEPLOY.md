# 🚀 Quick Deploy - Cheat Sheet

## Option 1: GitHub + Vercel (Easiest) ⭐
```bash
git push origin main
```
→ Auto-deploys on [vercel.com](https://vercel.com)

## Option 2: Vercel CLI (Fast)
```bash
npm install -g vercel
vercel login
vercel --prod
```

## Option 3: One Command
```bash
npm run deploy
```

---

## Test Before Deploy
```bash
npm run check        # Lint + Build
npm run preview      # Test locally
```

---

## Common Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview prod build
npm run deploy       # Deploy to Vercel
npm run lint         # Check for errors
```

---

## Files Created for Deployment
- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Ignore unnecessary files
- ✅ `vite.config.js` - Optimized build settings
- ✅ `check-deployment.sh/.bat` - Pre-flight scripts
- ✅ `VERCEL_GUIDE.md` - Complete guide

---

## Vercel Auto-Detects
- Framework: Vite
- Build: `npm run build`
- Output: `dist/`

---

## After Deploy
🎉 Your link: `https://your-project.vercel.app`

Share with Diya! 💖

---

## Need Help?
Read: `VERCEL_GUIDE.md` for complete instructions
