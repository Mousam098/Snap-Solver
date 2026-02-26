# 🧮 SnapSolver

AI-powered mathematical problem solver with interactive canvas for drawing and analyzing mathematical expressions.

## Design

![snapSolver Design](https://github.com/ranasujay/snapSolver/blob/master/snapSolver_design.png)

## ✨ Features

- **Interactive Canvas**: Draw mathematical expressions with intuitive tools
- **AI Analysis**: Google Gemini AI integration for problem solving
- **LaTeX Rendering**: Beautiful mathematical notation display
- **User Authentication**: Secure login and registration system
- **Modern UI**: Clean interface with emerald theme

## 🚀 Tech Stack

### **Frontend Technologies**
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server with Hot Module Replacement
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Production-ready motion library for smooth animations
- **React Router DOM** - Client-side routing for single-page application navigation

### **UI Components & Libraries**
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Beautiful, customizable SVG icons
- **React Hot Toast** - Elegant notification system
- **Heroicons** - Additional icon set for enhanced UI

### **Mathematical & Canvas**
- **HTML5 Canvas API** - Native drawing and image manipulation
- **MathJax** - Mathematical notation rendering and LaTeX support
- **Canvas Drawing Tools** - Custom pen, eraser, and color selection tools

### **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimal web application framework
- **Google Generative AI (Gemini)** - Advanced AI for mathematical problem analysis
- **JWT (JSON Web Tokens)** - Stateless authentication system
- **bcrypt** - Password hashing and security

### **Authentication & Security**
- **JWT Authentication** - Secure, stateless user sessions
- **React Context API** - Global state management for user authentication
- **CORS** - Cross-Origin Resource Sharing configuration
- **Input Validation** - Request validation middleware

### **Development Tools**
- **ESLint** - Code quality and consistency enforcement
- **PostCSS** - CSS post-processing tool
- **TypeScript Compiler** - Type checking and compilation
- **npm/yarn** - Package management

### **Design & Styling**
- **Emerald/Teal Color Theme** - Professional gradient color scheme
- **Glassmorphism Effects** - Modern UI with backdrop blur and transparency
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Custom SVG Logo** - Question mark design with mathematical symbols

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ranasujay/snapSolver.git
   cd snapSolver
   ```

2. **Backend Setup**
   ```bash
   cd BackEnd
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd FrontEnd
   npm install
   npm run dev
   ```

## 🏗️ Project Structure

```
snapSolver/
├── BackEnd/                    # Node.js Express API Server
│   ├── src/
│   │   ├── app.js              # Express application setup
│   │   ├── config/
│   │   │   └── constants.js    # Configuration constants
│   │   ├── middleware/
│   │   │   └── auth.js         # Authentication middleware
│   │   ├── models/
│   │   │   ├── ImageData.js    # Image data model
│   │   │   └── User.js         # User model
│   │   ├── routes/
│   │   │   ├── auth.js         # Authentication routes
│   │   │   └── calculator.js   # Math analysis routes
│   │   └── utils/
│   │       └── imageAnalyzer.js # AI analysis utilities
│   ├── package.json            # Backend dependencies
│   └── README.md               # Backend documentation
├── FrontEnd/                   # React TypeScript Client
│   ├── src/
│   │   ├── components/
│   │   │   └── ui/             # Reusable UI components
│   │   │       ├── button.tsx
│   │   │       └── sheet.tsx
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx # Authentication state management
│   │   ├── screens/
│   │   │   ├── auth/           # Authentication pages
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   └── home/           # Main application pages
│   │   │       ├── canvas.tsx   # Canvas interface
│   │   │       └── LandingPage.tsx # Marketing page
│   │   ├── services/
│   │   │   └── api.ts          # API service layer
│   │   ├── lib/
│   │   │   └── utils.ts        # Utility functions
│   │   ├── assets/             # Static assets
│   │   │   ├── calc.png
│   │   │   ├── google.svg
│   │   │   ├── react.svg
│   │   │   ├── showcase1.png
│   │   │   └── showcase2.png
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # Application entry point
│   │   └── constants.ts        # Frontend constants
│   ├── public/
│   │   └── logo.png            # Application logo
│   ├── package.json            # Frontend dependencies
│   ├── vite.config.ts          # Vite configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── README.md               # Frontend documentation
└── README.md                   # Project overview and setup
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open Pull Request


---

Made by [Sujay Rana](https://github.com/ranasujay)
