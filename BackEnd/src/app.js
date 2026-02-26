const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const calculatorRouter = require('./routes/calculator');
const authRouter = require('./routes/auth');
const { protect } = require('./middleware/auth');
const { PORT, ENV, MONGODB_URI } = require('./config/constants');


const app = express();

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.json({ message: "SnapSolver Server is running" });
});

// Routes
app.use('/auth', authRouter);
app.use('/calculate', protect, calculatorRouter); // Protect calculator route

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

if (ENV === 'dev') {
  // Enable hot reloading for development
  const livereload = require('livereload');
  const connectLivereload = require('connect-livereload');
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(__dirname);
  app.use(connectLivereload());
}