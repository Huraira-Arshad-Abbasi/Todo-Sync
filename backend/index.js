import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config(); // Ensure dotenv is configured before using process.env
import { Todo } from './todo.js';
import { User } from './user.js';
const router = express();
router.use(cors()); // To allow cross-origin requests from React frontend
router.use(bodyParser.json()); // To parse JSON request bodies
const secretKey = 'jsdfjsdfjsdkalweiuwenre23i8';
// Test route
router.get('/', (req, res) => {
    res.send('Server is running');
});
//authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // decoded token
    next();
  });
}
// Route to create a todo
router.post('/api/addTodo',authenticateToken, async (req, res) => {
    try {
        const { title, disc, date } = req.body;
    const email = req.user.email; // Extract from token

    const todo = await Todo.create({ title, disc, date, email });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get all todos
router.get('/api/todos',authenticateToken ,async (req, res) => {
    try {
        const email = req.user.email; // ✅ Extract from token
        const todos = await Todo.find({ email: email });
        if (!todos) {
            //  return an empty array if no todos are found
            res.status(200).json([]);
        } else {

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
        const { index } = req.params;
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
        const { name, email, password } = req.body;
        // Check if user already exists
        let existingUser = await User.find({ email })
        if (!existingUser.length === 0) {
            console.log(existingUser);
            return res.status(409).json({ message: 'Email already exists' });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({name, email, password: hashPassword})
        res.status(201).json(newUser);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/api/auth/logIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        let user = await User.findOne({ email});
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        let isMatch = await bcrypt.compare(password, user.password);       
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }   
        // Generate JWT token
        

        const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, { expiresIn: '1h' });
        console.log(token);
        
            res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.listen(3000, () => {
    console.log('Server running on port 3000');
});
