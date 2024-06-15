import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/dbConfig.js';

// Definição do modelo User
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    editor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    tipoConta: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "cliente",
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        },
    },
});

export default User;
