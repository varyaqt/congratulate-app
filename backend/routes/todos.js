const express = require("express");
const router = express.Router();
const Todo = require("../models/todo"); // Подключаем модель

// GET /api/todos — получить все todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find(); // Получаем все задачи
    res.json(todos); // Отправляем их в формате JSON
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/todos —
router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({ task: req.body.task }); // Создаем новую задачу
    await newTodo.save(); // Сохраняем в базе данных
    res.status(201).json(newTodo); // Отправляем ответ с созданной задачей
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/todos/:id — обновить
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated); // Отправляем обновленную задачу
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/todos/:id
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id); // Удаляем задачу по ID
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
