const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB подключение
const client = new MongoClient("mongodb+srv://mi1en:1234@cluster0.qbxk9.mongodb.net/?retryWrites=true&w=majority");
const db = client.db("congrats");
const collection = db.collection("congratulations");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API маршруты
app.get('/api/greetings', async (req, res) => {
  const data = await collection.find({}).toArray();
  res.json(data);
});

app.post('/api/greetings', async (req, res) => {
  const { text, occasion } = req.body;
  if (!text || !occasion) return res.status(400).json({ error: 'Missing text or occasion' });
  await collection.insertOne({ text, occasion });
  res.json({ message: 'Saved' });
});

// --- ОБСЛУЖИВАНИЕ ФРОНТЕНДА ---
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Запуск
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
