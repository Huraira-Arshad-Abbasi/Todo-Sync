import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Todo } from './todo.js';
import { User } from './user.js';
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
        console.log(req.body);
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// Route to get all todos
router.get('/api/todos/:email', async (req, res) => {
    try {
        
        const todos = await Todo.find({ email: req.params.email });
        if (!todos) {
            //  return an empty array if no todos are found
             res.status(200).json([]);
        }else{

            res.status(200).json(todos);
        }
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

router.post('/api/auth/signUp', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/api/auth/logIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.find({email, password});
        if (user && user.length > 0) {
            res.status(201).json(user);
        }else{
            return res.status(401).json({ message: 'Invalid credentials' });
        }        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.listen(3000, () => {
    console.log('Server running on port 3000');
});
