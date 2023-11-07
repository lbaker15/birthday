// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: String,
  executionArn: [String],
  email: String,
  password: String,
  name: String
});

export default mongoose.models.User || mongoose.model('User', userSchema);
