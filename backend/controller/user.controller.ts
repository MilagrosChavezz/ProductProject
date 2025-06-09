import { Request, Response } from 'express';
import userService from '../service/user.service';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName, address } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }
    
    const newUser = await userService.signUp({ email, password, firstName, lastName, address });
    res.status(201).json({ message: 'Usuario creado exitosamente', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el usuario', error });
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.logIn({ email, password });
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

const getProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
    
    const user = await userService.getProfile(decoded.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: 'Token inválido o expirado', error });
  }
};

export default { signUp, logIn, getProfile };