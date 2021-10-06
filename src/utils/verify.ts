import { verify } from "jsonwebtoken";
import { promisify } from "util";
import { UserModule } from "../User/User";

type Decoded = {
  id: string;
};

export async function verifyToken(token: string | undefined) {
  const verifyAsync = promisify(verify);

  // @ts-ignore
  const decoded: Decoded = await verifyAsync(token, process.env.JWT_SECRET);

  if (!decoded) {
    return {
      success: false,
      status: 401,
      message: "Unauthorized!",
    };
  }

  const user = await UserModule().getUserById(decoded.id);

  return {
    user,
  };
}
