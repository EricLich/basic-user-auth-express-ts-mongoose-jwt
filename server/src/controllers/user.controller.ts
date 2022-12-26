import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import validator from 'validator'
import bcrypt from 'bcrypt'
export interface UserController {
  createUser: (user: DocumentDefinition<UserDocument>, res: Response) => void,
  getUsers: () => Promise<UserDocument[]>,
  deleteUser: (id: string) => Promise<void>,
  login: (email: string, password: string) => Promise<{ user: UserDocument, token: string }>
}

const createToken = (_id: string) => {
  // @ts-ignore
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

const userCtrl: UserController = {
  createUser: async (user: DocumentDefinition<UserDocument>, res: Response): Promise<void> => {
    if (!validator.isEmail(user.email)) throw new Error('Email is not valid');
    if (!validator.isStrongPassword(user.password)) throw new Error('Password not strong enough');

    const exists = await UserModel.findOne({ email: user.email });
    if (exists) throw new Error('User already exists');

    try {
      const newUser = await UserModel.create({
        name: user.name,
        email: user.email,
        password: user.password
      });
      //create token
      const token = createToken(newUser.id);
      res.status(200).json({ email: newUser.email, token });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  login: async (email: string, password: string): Promise<{ user: UserDocument, token: string }> => {
    if (!email || !password) throw new Error('All fields must be filled');

    const user = await UserModel.findOne({ email });

    if (!user) throw new Error('Incorrect email');

    //check password
    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new Error('Email or password not correct');
    const token = createToken(user.id);

    return { user, token };
  },
  getUsers: async () => {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error: any) {
      throw new Error(error.message)
    }
  },
  deleteUser: async (id: string) => {
    try {
      await UserModel.findByIdAndDelete(id)
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default userCtrl;