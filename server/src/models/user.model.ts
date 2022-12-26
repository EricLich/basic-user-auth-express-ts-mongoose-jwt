import mongoose from "mongoose";
import bcrypt from 'bcrypt'
export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
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
    timestamps: true
  },
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt)
  next();
});


const UserModel = mongoose.model('User', userSchema);

export default UserModel;
