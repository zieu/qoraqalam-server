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

export function UserModule() {
  const getUserById = async (id: string): Promise<SuccessType | FailType> => {
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

  const getUserByUsername = async (username: string) => {
    try {
      const user = await User.findOne({ username });
      return {
        success: true,
        user,
        status: 200,
      };
    } catch (error) {
      return {
        success: false,
        // error: error.message,
      };
    }
  };

  const getUser = async (token: string | undefined) => {
    try {
      if (!token) {
        return {
          success: false,
          status: 401,
          message: "Unauhtorized!",
        };
      }

      const user = await verifyToken(token);

      return user;
    } catch (error) {
      return {
        success: false,
      };
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUser,
  };
}
