# 💖 Valentine's Day Proposal Website

A romantic, interactive Valentine's Day proposal experience built with React, Three.js, and Framer Motion.

## 🚀 Deployment on Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO)

### Manual Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will automatically detect the Vite configuration
5. Click "Deploy"

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📦 Project Structure

```
frontend-propose/
├── src/
│   ├── components/      # UI components (ProposalCard, Buttons, FinalScreen)
│   ├── three/          # Three.js components (Scene, Hearts, Particles, etc.)
│   ├── styles/         # Global CSS styles
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Application entry point
├── public/             # Static assets
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel deployment configuration
└── package.json        # Project dependencies
```

## ✨ Features

- 🎨 **Immersive 3D Scene** with floating hearts and particles
- 💫 **Glassmorphism UI** with smooth animations
- 🎯 **Interactive NO Button** that jumps away when clicked
- 🎉 **Celebration Screen** with confetti and personalized message
- 📱 **Fully Responsive** across all devices and screen sizes
- ⚡ **Optimized Performance** with code splitting and lazy loading

## 🔧 Configuration

### Vercel Settings
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

### Environment Variables
No environment variables required for basic deployment.

## 🎯 Performance Optimizations

- ✅ Three.js and React Three Fiber split into separate chunk
- ✅ Framer Motion loaded separately
- ✅ Console logs removed in production
- ✅ Assets cached with immutable headers
- ✅ Responsive images and lazy loading

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Customization

To personalize the proposal:

1. Edit names in `src/components/ProposalCard.jsx`
2. Update final message in `src/components/FinalScreen.jsx`
3. Change GIF URL in `src/components/FinalScreen.jsx`
4. Adjust colors in `src/styles/global.css`

## 🐛 Troubleshooting

### Build fails on Vercel
- Ensure Node version is 18.x or higher
- Check that all dependencies are in `package.json`
- Verify no TypeScript errors

### Three.js scene not rendering
- Check browser console for WebGL errors
- Ensure device supports WebGL 2.0
- Try different browser

### NO button not moving
- Ensure JavaScript is enabled
- Check that card has proper positioning
- Verify click events are working

## 📄 License

MIT License - feel free to use this for your own proposals! ❤️

---

Made with ❤️ for Diya by Anni
