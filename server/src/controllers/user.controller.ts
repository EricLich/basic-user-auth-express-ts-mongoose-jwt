import { DocumentDefinition } from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';

export interface UserController {
  createUser: (user: DocumentDefinition<UserDocument>) => void,
  getUsers: () => Promise<UserDocument[]>,
  deleteUser: (id: string) => Promise<void>,
}

const userCtrl: UserController = {
  createUser: async (user: DocumentDefinition<UserDocument>): Promise<UserDocument> => {
    try {
      const newUser = await UserModel.create({
        name: user.name,
        email: user.password,
        password: user.password
      });
      return newUser
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