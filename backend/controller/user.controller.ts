import { Request, Response } from "express";
import userService from "../service/user.service";
import dotenv from "dotenv";
import { SignUpData, LoginData } from "../Request/userData";

dotenv.config();

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, address } =
      req.body as SignUpData;

    if (!email || !password) {
      return void res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return void res.status(400).json({ message: "Email already registered" });
    }

    if (password.length < 6) {
      return void res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (!firstName || !lastName || !address) {
      return void res
        .status(400)
        .json({ message: "First name, last name, and address are required" });
    }

    const newUser = await userService.signUp({
      email,
      password,
      firstName,
      lastName,
      address,
    });

    return void res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    return void res
      .status(500)
      .json({ message: "Error to register User", error });
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginData;

    const { token, user } = await userService.logIn({ email, password });

    return void res.status(200).json({
      message: "Successfully logged in",
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        address: user.address,
      },
    });
  } catch (error: any) {
    const status = error.status || 500;
    const message = error.message || "Error to log in";
    return void res.status(status).json({ message });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return void res
        .status(401)
        .json({ message: "Unable to show user profile" });
    }

    const user = await userService.getProfile(userId);

    if (!user) {
      return void res.status(404).json({ message: "User not found" });
    }

    return void res.status(200).json(user);
  } catch (error) {
    return void res
      .status(401)
      .json({ message: "Error to obtain user profile", error });
  }
};

export default { signUp, logIn, getProfile };
