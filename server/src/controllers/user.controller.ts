import { Response } from 'express';
import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export interface UserController {
  createUser: (user: DocumentDefinition<UserDocument>, res: Response) => void,
  getUsers: () => Promise<UserDocument[]>,
}

const userCtrl: UserController = {
  createUser: async (user: DocumentDefinition<UserDocument>, res: Response) => {
    try {
      const newUser = await UserModel.create({
        name: user.name,
        email: user.password,
        password: user.password
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  getUsers: async () => {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}

export default userCtrl;