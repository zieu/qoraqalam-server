import { Request, Response } from "express";
import auth from "../auth/Auth";

export const signup = async (req: Request, res: Response) => {
  const doc = await auth().signup(req.body);

  res.json({
    doc,
  });
};

export const loginByEmail = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  const doc = await auth().loginByEmail({ email: emailOrUsername, password });

  res.json({
    doc,
  });
};

export const loginByUsername = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  const doc = await auth().loginByUsername({ username: emailOrUsername, password });

  res.json({
    doc,
  });
};
