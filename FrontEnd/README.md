# 🎨 SnapSolver Frontend

React TypeScript client for mathematical problem solving with interactive canvas.

## ✨ Features

- **Interactive Canvas**: HTML5 Canvas with drawing tools
- **Real-time AI Analysis**: Google Gemini AI integration
- **LaTeX Rendering**: Mathematical notation with MathJax
- **Modern UI**: Tailwind CSS with emerald theme
- **Authentication**: JWT-based secure login system

## � Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

## � Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
FrontEnd/
├── src/
│   ├── components/
│   │   └── ui/                     # Reusable UI components
│   │       ├── button.tsx
│   │       └── sheet.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx         # Authentication state management
│   ├── screens/
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── Login.tsx           # User login page
│   │   │   └── Register.tsx        # User registration page
│   │   └── home/                   # Main application pages
│   │       ├── canvas.tsx           # Interactive canvas interface
│   │       └── LandingPage.tsx     # Marketing/welcome page
│   ├── services/
│   │   └── api.ts                  # API service layer
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   ├── assets/                     # Static assets
│   │   ├── calc.png
│   │   ├── google.svg
│   │   ├── react.svg
│   │   ├── showcase1.png
│   │   └── showcase2.png
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   ├── constants.ts                # Frontend constants
│   ├── App.css                     # Global styles
│   ├── index.css                   # Base styles
│   └── vite-env.d.ts              # Vite environment types
├── public/
│   └── logo.png                    # Application logo
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite build configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.app.json               # App-specific TypeScript config
├── tsconfig.node.json              # Node-specific TypeScript config
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
├── components.json                 # shadcn/ui configuration
└── README.md                       # Frontend documentation
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Code quality check

##  Contributing

1. Create feature branch
2. Follow TypeScript guidelines
3. Add tests for new features
4. Submit pull request

---

**Built with React & TypeScript**
