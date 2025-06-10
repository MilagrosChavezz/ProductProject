import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LogInData } from '../Request/loginData';
import { SignUpData } from '../Request/signUpData';


dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
const User = db.User;


export class UserService {


  findUserByEmail(email: any) {
    return User.findOne({ where: { email } });
  }
 
  async signUp(data: SignUpData) {
   
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    
    const hashedPassword = await bcrypt.hash(data.password, 10);


    const newUser = await User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    });

    return newUser;
  }

  
  async logIn(data: LogInData) {
  const user = await User.findOne({ where: { email: data.email } });

  if (!user) {
    const error: any = new Error('User not found');
    error.status = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    const error: any = new Error('Invalid password');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET_KEY,
    { expiresIn: '2h' }
  );

  return { token, user };
}


  


  async getProfile(userId: number) {
   
    const user = await User.findByPk(userId, {
      attributes: ['id', 'email', 'firstName', 'lastName', 'address'],
    });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  }
}

export default new UserService();