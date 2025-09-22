import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ 
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export const User = mongoose.model('User', UserSchema);

// mongodb+srv://hurairaabbasi647:8JXIlfeDPJ29MZBo@todoappcluster.tdbezdp.mongodb.net/?retryWrites=true&w=majority&appName=TodoAppCluster
