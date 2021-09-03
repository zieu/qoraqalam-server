import { Request, Response } from "express";
import { UserModule } from "../User/User";

export const getUserById = async (req: Request, res: Response) => {
  console.log(req.params);
  const user = await UserModule().getUserById(req.params.id);

  res.json(user);
};

export const getUserByUsername = async (req: Request, res: Response) => {
  const user = await UserModule().getUserByUsername(req.params.username);

  res.json(user);
};
