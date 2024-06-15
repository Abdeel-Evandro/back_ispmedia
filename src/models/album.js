// models/album.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Artista from './artista.js';
import Image from './image.js';

const Album = sequelize.define('album', {
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
    artistaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Artista,
            key: 'id'
        },
        allowNull: true
    },
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image,
            key: 'id'
        },
        allowNull: true
    },
    public:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

Album.belongsTo(Artista, { foreignKey: 'artistaId' });
Album.belongsTo(Image, { foreignKey: 'imageId' });

export default Album;
