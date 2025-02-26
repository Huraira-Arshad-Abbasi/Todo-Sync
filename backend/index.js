import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Todo } from './todo.js';

const router = express();
router.use(cors()); // To allow cross-origin requests from React frontend
router.use(bodyParser.json()); // To parse JSON request bodies

// Test route
router.get('/', (req, res) => {
    res.send('Server is running');
});

// Route to create a todo
router.post('/api/todos', async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// Route to get all todos
router.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a specific todo
router.delete('/api/todos/:index', async (req, res) => {
    try {
        const todos = await Todo.find();
        const reverseTodo = todos.slice().reverse()
        const {index} = req.params;
        const todoToDelete = reverseTodo[index];
        const newTodos = await Todo.findByIdAndDelete(todoToDelete._id)
        
        if (!newTodos) {
            return res.status(404).json({ message: `Todo not found with this id: ${index}` });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.listen(3000, () => {
    console.log('Server running on port 3000');
});
