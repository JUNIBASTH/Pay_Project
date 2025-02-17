import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// Definir la interfaz de atributos del usuario
interface UserAttributes {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: 'admin' | 'empleado';
}

// Opcional para evitar definir manualmente los campos autogenerados
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Definir el modelo extendiendo Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password!: string;
  public rol!: 'admin' | 'empleado';
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('admin', 'empleado'), defaultValue: 'empleado' }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

export default User;
