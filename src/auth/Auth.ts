import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import User, { IUser } from "../User/UserModel";
import { STATUS_CODES } from "../utils/statusCodes";

export type UserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type SuccessType = {
  success: true;
  status: number;
  user: IUser | null;
  token: string;
};

type FailType = {
  success: false;
  status: number;
  error: string;
};

type ResponseType = Promise<SuccessType | FailType>;

function Auth() {
  const signup = async (userData: UserData): ResponseType => {
    try {
      const user = await User.create(userData);

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      return {
        success: true,
        status: STATUS_CODES["CREATED"],
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["BAD_REQUEST"],
        error: "Bad Request!",
      };
    }
  };

  const loginByEmail = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          success: false,
          status: STATUS_CODES["NOT_FOUND"],
          error: "Username or password invalid!",
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return {
          success: false,
          status: STATUS_CODES["BAD_REQUEST"],
          error: "Username or password invalid!",
        };
      }

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      return {
        success: true,
        status: STATUS_CODES["OK"],
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["BAD_REQUEST"],
        error: "Bad Request!",
      };
    }
  };

  const loginByUsername = async (username: string, password: string) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return {
          success: false,
          status: STATUS_CODES["NOT_FOUND"],
          error: "Username or password invalid!",
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return {
          success: false,
          status: STATUS_CODES["BAD_REQUEST"],
          error: "Username or password invalid!",
        };
      }

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      if (!isMatch) {
        return {
          success: false,
          status: STATUS_CODES["BAD_REQUEST"],
          error: "Username or password invalid!",
        };
      }

      return {
        success: true,
        status: STATUS_CODES["OK"],
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        status: STATUS_CODES["BAD_REQUEST"],
        error: "Username or password invalid!",
      };
    }
  };

  return {
    signup,
    loginByEmail,
    loginByUsername,
  };
}

export default Auth;
