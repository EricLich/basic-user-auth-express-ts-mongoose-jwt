import { NextFunction, Request, Response } from "express";

function emptyChecker(req: Request, res: Response, next: NextFunction) {
  if (req.body.name && req.body.email && req.body.password) {
    next();
  } else {
    res.send('All fields are mandatory').status(400);
  }
}

export default emptyChecker;