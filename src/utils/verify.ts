import { verify } from "jsonwebtoken";
import { promisify } from "util";
import { UserModule } from "../User/User";
import { IUser } from "../User/UserModel";

type Decoded = {
  id: string;
};

type SuccessType = {
  success: true;
  status: number;
  user: IUser | null;
};

type FailType = {
  success: false;
  status: number;
};

export async function verifyToken(token: string | undefined): Promise<SuccessType | FailType> {
  const verifyAsync = promisify(verify);

  // @ts-ignore
  const decoded: Decoded = await verifyAsync(token, process.env.JWT_SECRET);

  if (!decoded) {
    return {
      success: false,
      status: 401,
      // message: "Unauthorized!",
    };
  }

  const user = await UserModule().getUserById(decoded.id);

  return user;
}
