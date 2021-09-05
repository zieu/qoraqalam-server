import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../User/UserModel";

export type UserData = {
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
        // error: error.message,
      };
    }
  };

  const loginByEmail = async ({password, email}: Pick<UserData, "email" | "password">) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return {
          success: false,
          error: "Username or password invalid!",
          status: 404,
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);


      if (!isMatch) {
        return {
          success: false,
          error: "Username or password invalid!",
          status: 404,
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
        // error: error.message,
      };
    }
  };

  const loginByUsername = async ({password, username}: Pick<UserData, "username" | "password">) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return {
          success: false,
          error: "Username or password invalid!",
          status: 404,
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("ISMATCH", isMatch);

      if (!isMatch) {
        return {
          success: false,
          error: "Username or password invalid!",
          status: 404,
        };
      }

      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "30d" });

      if (!isMatch) {
        return {
          success: false,
          error: "Username or password invalid!",
        };
      }

      return {
        success: true,
        status: 200,
        user,
        token,
      };
    } catch (error) {
      return {
        success: false,
        // error: error.message,
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
