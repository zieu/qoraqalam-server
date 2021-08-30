import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../User/UserModel";

type UserData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  avatar?: string;
};

function Auth() {
  const signup = async (userData: UserData) => {
    try {
      const user = await User.create(userData);

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      return {
        success: true,
        status: 201,
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const loginByEmail = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          success: false,
          error: "Username or password invalid!",
        };
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return {
          success: false,
          error: "Username or password invalid!",
        };
      }

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      return {
        success: true,
        status: 200,
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  const loginByUsername = async (username: string, password: string) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return {
          success: false,
          error: "Username or password invalid!",
        };
      }

      const isMatch = bcrypt.compare(password, user.password);

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      if (!isMatch) {
        return {
          success: false,
          error: "Username or password invalid!",
          token,
        };
      }

      return {
        success: true,
        status: 200,
        user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
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
