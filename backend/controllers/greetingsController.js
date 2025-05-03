const Greeting = require('../models/greeting');

// Получить все поздравления
exports.getAllGreetings = async (req, res) => {
  try {
    const greetings = await Greeting.find();
    res.json(greetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Создать новое поздравление
exports.createGreeting = async (req, res) => {
  const { sender, recipient, message } = req.body;
  const newGreeting = new Greeting({ sender, recipient, message });

  try {
    const savedGreeting = await newGreeting.save();
    res.status(201).json(savedGreeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
