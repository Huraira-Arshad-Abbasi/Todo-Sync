import mongoose from "mongoose";

// Define Todo schema
const todoSchema = mongoose.Schema({
  title: { type: String },
  disc: { type: String },
  date: {
    type: Date, set: function (value) {
      return value || Date.now();  // Set current date if the value is null
    }
  },
  status: {
    type: String,
    default: 'pending'
  },
  email: { type: String, required: true }
})


export const Todo = mongoose.model('Todo', todoSchema); 