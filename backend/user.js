import mongoose from "mongoose";
// mongoose.connect(`mongodb://127.0.0.1:27017/Todos`)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Database connection error:', err.message));

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model('User', UserSchema);
