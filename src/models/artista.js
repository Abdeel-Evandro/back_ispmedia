// models/artista.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Image from './image.js';

const Artista = sequelize.define('artista', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image,
            key: 'id'
        },
        allowNull: true
    }
});

Artista.belongsTo(Image, { foreignKey: 'imageId' });
export default Artista;
