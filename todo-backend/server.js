const express = require('express')
const app = express()

var cors=require('cors')
app.use(cors({
    origin:'http://localhost:5175'
}))
app.use(express.json())
let tasks=[
   
]
app.get('/', (req, res) => {  
  res.json(tasks)
})
const { v4: uuidv4 } = require('uuid');
app.post('/', (req, res) => { 
    console.log(req.body)
    const task=req.body.task
    tasks.push({        
            _id:uuidv4(),
            task:task,
    },)
    res.json("success")
  })
  app.delete("/task/:id", (req, res) => {
    const taskId = req.params.id;

    // Find the task index by ID
    const taskIndex = tasks.findIndex(task => task._id === taskId);

    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1); // Remove the task
        res.send("Task deleted successfully");
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

   app.put('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body.task;
    console.log("Received Task ID:", taskId);
    console.log("Updated Task Content:", updatedTask);
    console.log(`Updating task: ${taskId} with new value: ${updatedTask}`);

    const taskIndex = tasks.findIndex(task => task._id === taskId);
    console.log("Task Index Found:", taskIndex);

    if (taskIndex !== -1) {
        tasks[taskIndex].task = updatedTask; // Update the task
        console.log("Updated Task:", tasks[taskIndex]);
        res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
    } else {
      console.error("Task not found for ID:", taskId);
        res.status(404).json({ message: "Task not found" });
    }
});
app.listen(3010)