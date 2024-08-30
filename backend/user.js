import mongoose from "mongoose";
mongoose.connect('mongodb://127.0.0.1:27017/Todos')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Database connection error:', err.message));

let todoSchema = mongoose.Schema({
    title: {type : String},
    disc: {type : String},
    date: {type : Date, set: function(value) {
        return value || Date.now();  // Set current date if the value is null
      }}
}) 

 export const Todo =  mongoose.model('Todo', todoSchema);