import { NextFunction, Request, Response } from "express";
import auth from "../auth/Auth";
import { verifyToken } from "../utils/verify";
import { getToken } from "../utils/getToken";

export const signup = async (req: Request, res: Response) => {
  const doc = await auth().signup(req.body);

  res.json({
    doc,
  });
};

export const loginByEmail = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  const doc = await auth().loginByEmail(emailOrUsername, password);

  res.status(doc.status!).json({
    doc,
  });
};

export const loginByUsername = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  const doc = await auth().loginByUsername(emailOrUsername, password);

  res.status(doc.status!).json({
    doc,
  });
};

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  const token = getToken(header);

  if (!token) {
    res.status(401).json({
      success: false,
      status: 401,
      error: "Unauthorized!",
    });
  }

  const currUser = await verifyToken(token);

  if (!currUser.success) {
    res.status(currUser.status!).json(currUser);
  }

  next();
};
