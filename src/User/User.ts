import User, { IUser } from "./UserModel";

import { verifyToken } from "../utils/verify";
import { STATUS_CODES } from "../utils/statusCodes";

type SuccessType = {
  success: true;
  status: number;
  user: IUser | null;
};

type FailType = {
  success: false;
  status: number;
};

type ResponseType = Promise<SuccessType | FailType>;

export function UserModule() {
  const getUserById = async (id: string): ResponseType => {
    try {
      const user = await User.findById(id);
      return {
        success: true,
        status: STATUS_CODES["OK"],
        user,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["UNAUTHORIZED"],
        // error: error.message,
      };
    }
  };

  const getUserByUsername = async (username: string): ResponseType => {
    try {
      const user = await User.findOne({ username });
      return {
        success: true,
        status: STATUS_CODES["OK"],
        user,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["NOT_FOUND"],
        // error: error.message,
      };
    }
  };

  const getUser = async (token: string | undefined): ResponseType => {
    try {
      if (!token) {
        return {
          success: false,
          status: STATUS_CODES["UNAUTHORIZED"],
          // message: "Unauhtorized!",
        };
      }

      const user = await verifyToken(token);

      return user;
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["NOT_FOUND"],
      };
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUser,
  };
}
