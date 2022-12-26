import express, { Request, Response, NextFunction } from 'express';
import userCtrl from './controllers/user.controller';
import connect from './utils/dbConnect';
import emptyChecker from './middlewares/emptychecker';
import { TypedRequestBody } from './utils/types';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080

app.listen(PORT, async (): Promise<void> => {
  try {
    console.log(`App running on port ${PORT}`);
    connect();
  } catch (err: any) {
    console.log({ 'err': err });
  }
});

app.get('/', (req: Request, res: Response, next: NextFunction): void => {
  res.sendStatus(200);
});

app.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userCtrl.getUsers();
    res.json(users).status(200);
  } catch (err) {
    res.send('Error').status(400);
  }
});

app.post('/users', emptyChecker, async (req: TypedRequestBody<{ name: string, email: string, password: string }>, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userCtrl.createUser({ name: req.body.name, email: req.body.email, password: req.body.password });
    res.send('User created').status(200);
  } catch (err) {
    res.send('There was an error creating user').status(400);
  }
});

app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userCtrl.deleteUser(req.params.id);
    res.send('User deleted').status(200);
  } catch (error) {
    res.send('Error deleting user').status(500);
  }
});