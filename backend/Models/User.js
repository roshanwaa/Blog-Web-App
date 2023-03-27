import mongoose, { model, Schema } from 'mongoose';

// const UserSchema = new mongoose.Schema({
const UserSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  userEmail: { type: String, required: true },
  userPass: { type: String, required: true },
});

const UserModel = model('User', UserSchema);

export default UserModel;
