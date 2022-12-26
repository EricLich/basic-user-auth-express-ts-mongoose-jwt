import express, { Request, Response, NextFunction } from 'express';
import userCtrl from './controllers/user.controller';
import connect from './utils/dbConnect';
import { TypedRequestBody } from './utils/types';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  console.log(`App running on port ${PORT}`);
  try {
    connect();
  } catch (err: any) {
    console.log({ 'err': err });
  }
});

function checker(req: Request, res: Response, next: NextFunction) {
  if (req.body.name && req.body.email && req.body.password) {
    next();
  } else {
    res.send('All fields are mandatory').status(400);
  }
}

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
});

app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userCtrl.getUsers();
    res.json(users).status(200);
  } catch (err) {
    res.send('Error').status(400);
  }
});

app.post('/users', checker, async (req: TypedRequestBody<{ name: string, email: string, password: string }>, res: Response, next: NextFunction) => {
  try {
    await userCtrl.createUser({ name: req.body.name, email: req.body.email, password: req.body.password }, res);
    res.send('User created').status(200);
  } catch (err) {
    res.send('There was an error creating user').status(400);
  }
});