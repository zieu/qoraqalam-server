import { Error } from "mongoose";
import User from "./UserModel";

export function UserModule() {
  const getUserById = async (id: string) => {
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
        error: error.message,
      };
    }
  };

  return {
    getUserById,
  };
}
