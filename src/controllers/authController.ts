import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import auth from "../auth/Auth";
import { UserModule } from "../User/User";

export const signup = async (req: Request, res: Response) => {
  const doc = await auth().signup(req.body);

  res.json({
    doc,
  });
};

export const loginByEmail = async (req: Request, res: Response) => {
  const { emailOrUsername, password } = req.body;
  const doc = await auth().loginByEmail(emailOrUsername, password);
  console.log("STATUS", doc);

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
  let token: string | undefined;
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    token = header.split(" ")[1];
  } else {
    token = undefined;
  }

  if (!token) {
    res.status(401).json({
      success: false,
      status: 401,
      error: "Unauthorized!",
    });
  }

  const verify = promisify(jwt.verify);

  type Decoded = {
    id: string;
  };

  // @ts-ignore
  const decoded: Decoded = await verify(token, process.env.JWT_SECRET!);

  const currUser = await UserModule().getUserById(decoded.id);
  console.log(currUser);

  if (!currUser)
    res.status(401).json({
      success: false,
      status: 401,
      error: "Unauthorized!",
    });

  next();
};
