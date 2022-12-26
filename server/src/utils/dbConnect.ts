import mongoose from "mongoose";

async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/user-auth');
    console.log('DB connected');
  } catch (err: any) {
    throw new Error(err);
  }
}

export default connect;