import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface IUser {
  id?: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'empleado';
}

export class User extends Model<IUser> implements IUser {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public rol!: 'admin' | 'empleado';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'empleado'),
      allowNull: false,
      defaultValue: 'empleado',
    },
  },
  {
    tableName: 'users',
    sequelize, // conexión de Sequelize
  }
);