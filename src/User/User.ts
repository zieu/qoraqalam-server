import User, { IUser } from "./UserModel";

import { verifyToken } from "../utils/verify";

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
        status: 200,
        user,
      };
    } catch (error) {
      return {
        success: false,
        status: 401,
        // error: error.message,
      };
    }
  };

  const getUserByUsername = async (username: string): ResponseType => {
    try {
      const user = await User.findOne({ username });
      return {
        success: true,
        status: 200,
        user,
      };
    } catch (error) {
      return {
        success: false,
        status: 404,
        // error: error.message,
      };
    }
  };

  const getUser = async (token: string | undefined): ResponseType => {
    try {
      if (!token) {
        return {
          success: false,
          status: 401,
          // message: "Unauhtorized!",
        };
      }

      const user = await verifyToken(token);

      return user;
    } catch (error) {
      return {
        success: false,
        status: 404,
      };
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUser,
  };
}
