const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5175'
}));
app.use(express.json());

let tasks = [];

app.get('/', (req, res) => {
    res.json(tasks);
});

const { v4: uuidv4 } = require('uuid');

app.post('/', (req, res) => {
    const task = req.body.task;
    tasks.push({
        _id: uuidv4(),
        task: task,
    });
    res.json("success");
});

app.delete('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.send("Task deleted successfully");
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;
    const taskIndex = tasks.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
        tasks[taskIndex].task = updatedTask;
        res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

// Use dynamic port for Render deployment
const port = process.env.PORT || 3010;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
