import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Ensure dotenv is configured before using process.env
import { Todo } from './todo.js';
import { User } from './user.js';
const router = express();
router.use(cors()); // To allow cross-origin requests from React frontend
router.use(bodyParser.json()); // To parse JSON request bodies

// Variables from .env
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Test route
router.get('/', (req, res) => {
    res.send('Server is running');
});

//authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: 'Access denied' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user; // decoded token
        next();
    });
}
// Route to create a todo
router.post('/api/addTodo', authenticateToken, async (req, res) => {
    try {
        const { title, disc, date,status} = req.body;
        const email = req.user.email; // Extract from token
        const todo = await Todo.create({ title, disc, date,status, email });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get all todos
router.get('/api/todos', authenticateToken, async (req, res) => {
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
// Route to update a specific todo
// ✅ Update todo by ID (status or any other field)
router.put('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.user.email; // get from token
    const { status } = req.body;  // we only update status for now

    // Ensure only the owner can update their todo
    const todo = await Todo.findOneAndUpdate(
      { _id: id, email }, 
      { status }, 
      { new: true } // return updated document
    );
    if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a specific todo
router.delete('/api/todos/:_id', authenticateToken, async (req, res) => {
    try {
        const {_id} = req.params;
        const newTodos = await Todo.findByIdAndDelete(_id)
        if (!newTodos) {
            return res.status(404).json({ message: `Todo not found with this id: ${_id}` });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
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
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword })
        res.status(201).json(newUser);


    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/api/auth/logIn', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        // console.log(token);

        res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
