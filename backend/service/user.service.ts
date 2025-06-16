import { User } from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LogInData } from "../Request/logInData";
import { SignUpData } from "../Request/signUpData";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export class UserService {
  findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async signUp(data: SignUpData) {
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser: User = await User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      role: data.role || "user", 
    });

    return newUser;
  }

  async logIn(data: LogInData) {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      const error = new Error("User not found") as Error & { status?: number };
      error.status = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
       const error = new Error("Invalid password") as Error & { status?: number };
      error.status = 401;
      throw error;
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "2h",
    });

    return { token, user };
  }

  async getProfile(userId: number):Promise<Omit<User, 'password'>> {

    const user:User|null = await User.findByPk(userId, {
      attributes: ["id", "email", "firstName", "lastName", "address"],
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}

export default new UserService();
