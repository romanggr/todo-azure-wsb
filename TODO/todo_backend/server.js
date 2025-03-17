const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let list = [
    { id: 1, task: "Buy milk", done: false },
    { id: 2, task: "Buy water", done: false },
    { id: 3, task: "Buy bread", done: true }
];

app.listen(5000, () => {
    console.log('Server listening on port: 5000');
});

app.post('/add', (req, res) => {
    const { task } = req.body;
    const newTask = { id: list.length + 1, task, done: false };
    list.push(newTask);
    res.json(newTask);
});

app.get('/get', (req, res) => {
    res.json(list);
});

app.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const task = list.find(item => item.id === id);

    if (task) {
        task.done = !task.done;  // ✅ Toggle instead of setting to true only
        res.json(task);          // Return updated task
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});


app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Extract `id` correctly
    const { task } = req.body;

    const index = list.findIndex(item => item.id === id);

    if (index !== -1) {
        list[index].task = task; // Update only the correct task
        res.json(list[index]); // Return the updated task
    } else {
        res.status(404).json({ message: "Task not found" });
    }

    console.log(list);
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const taskId = parseInt(id, 10);
    const index = list.findIndex(item => item.id === taskId);

    if(index !== -1){
        list.splice(index, 1);
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

module.exports = app;
