import { User } from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { LogInData } from "../Request/logInData";
import { SignUpData } from "../Request/userData";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

export class UserService {

  findUserByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  async signUp(data: SignUpData) {
    const existingUser = await this.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error("The email is already registered");
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
    const user = await this.findUserByEmail(data.email);

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

    const token = jwt.sign({ id: user.id, email: user.email ,role:user.role}, SECRET_KEY, {
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

  async createDefaultAdmin() {
  const existingAdmin = await User.findOne({ where: { email: "admin@admin.com" } });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      email: "admin@admin.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "Main",
      address: "System",
      role: "admin",
    });
    console.log("Admin created.");
  } else {
    console.log("admin already exist.");
  }
}
}

export default new UserService();
