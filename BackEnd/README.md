# 🚀 SnapSolver Backend

Node.js Express API server with Google Gemini AI integration for mathematical problem analysis.

## ✨ Features

- **Google Gemini AI**: Mathematical problem recognition and solving
- **JWT Authentication**: Secure user sessions
- **RESTful API**: Clean, predictable endpoints
- **Image Analysis**: Process canvas drawings
- **CORS Support**: Cross-origin resource sharing

## 🚀 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Generative AI** - AI integration
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Start Production**
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
BackEnd/
├── src/
│   ├── app.js                      # Express application setup
│   ├── config/
│   │   └── constants.js            # Configuration constants
│   ├── middleware/
│   │   └── auth.js                 # Authentication middleware
│   ├── models/
│   │   ├── ImageData.js            # Image data model
│   │   └── User.js                 # User model
│   ├── routes/
│   │   ├── auth.js                 # Authentication routes
│   │   └── calculator.js           # Math analysis routes
│   └── utils/
│       └── imageAnalyzer.js        # AI analysis utilities
├── package.json                    # Dependencies and scripts
├── .env.example                    # Environment variables template
└── README.md                       # Backend documentation
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/calculator/analyze` | Analyze math problems |
| GET | `/api/calculator/history` | Get analysis history |

## 🔒 Security Features

- **JWT Authentication** - Secure token-based sessions
- **Password Hashing** - bcrypt encryption
- **Input Validation** - Request validation middleware
- **CORS Configuration** - Cross-origin control

## 🤝 Contributing

1. Follow Node.js best practices
2. Add tests for new features
3. Update API documentation
4. Submit pull request

---

**Built with Node.js & Express**