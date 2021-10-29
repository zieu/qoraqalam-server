import { Request, Response } from "express";
import { UserModule } from "../User/User";
import { getToken } from "../utils/getToken";

export const getUserById = async (req: Request, res: Response) => {
  console.log(req.params);
  const user = await UserModule().getUserById(req.params.id);

  res.status(user.status).json(user);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const user = await UserModule().getUserByUsername(req.params.username);

  res.status(user.status).json(user);
};

export const getUser = async (req: Request, res: Response) => {
  const header = req.headers.authorization;
  const token = getToken(header);

  const user = await UserModule().getUser(token);

  res.status(user.status).json(user);
};
