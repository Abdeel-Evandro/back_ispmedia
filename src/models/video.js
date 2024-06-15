// models/imagem.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './user.js';
import Album from './album.js';

const Video = sequelize.define('video', {
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
    albumId: {
        type: DataTypes.INTEGER,
        references: {
            model: Album,
            key: 'id'
        },
        allowNull: false
    },
    nome_ficheiro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extensao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    public:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

// Relações
Video.belongsTo(User, { foreignKey: 'user_Id' });
Video.belongsTo(Album, { foreignKey: 'albumId' });
User.hasMany(Video, { foreignKey: 'user_Id' });

export default Video;