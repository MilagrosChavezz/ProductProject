import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY as string;
const User = db.User;

export interface SignUpData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
}

export interface LogInData {
  email: string;
  password: string;
}

export class UserService {
  /**
   * Registra un nuevo usuario.
   * Lanza un error si el email ya existe.
   */
  async signUp(data: SignUpData) {
    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Crea el usuario en la base de datos
    const newUser = await User.create({
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
    });

    return newUser;
  }

  /**
   * Realiza el inicio de sesión.
   * Verifica el email y la contraseña; si todo es correcto, retorna un token y los datos del usuario.
   */
  async logIn(data: LogInData) {
    // Busca el usuario por email
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Compara la contraseña ingresada con la almacenada (hasheada)
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      throw new Error('Contraseña incorrecta');
    }

    // Genera un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '2h' });
    return { token, user };
  }

  /**
   * Obtiene el perfil de un usuario dado su ID.
   */
  async getProfile(userId: number) {
    // Busca el usuario por PK y filtra atributos sensibles
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