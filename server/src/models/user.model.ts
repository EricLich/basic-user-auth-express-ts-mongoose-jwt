import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
