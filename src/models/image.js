// models/imagem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './user.js';

const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_Id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome_ficheiro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extensao: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Relações
Image.belongsTo(User, { foreignKey: 'user_Id' });
User.hasMany(Image, { foreignKey: 'user_Id' });

export default Image;
