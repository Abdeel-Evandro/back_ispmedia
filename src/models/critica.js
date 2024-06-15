// models/critica.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Album from './album.js';
import User from './user.js'

const Critica = sequelize.define('critica', {
    idC: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
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
    comentario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pontuacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

// Relações
Critica.belongsTo(Album, { foreignKey: 'albumId' });
Critica.belongsTo(User, { foreignKey: 'userId' });

export default Critica;
