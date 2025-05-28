const express = require('express');
const cors = require('cors');
const app = express();

const lobbyRoutes = require('./routes/lobby');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api/lobby', lobbyRoutes);

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
