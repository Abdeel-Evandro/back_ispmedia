// models/music.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Genero from './genero.js';
import Artista from './artista.js';
import Album from './album.js';
import Image from './image.js'
import User from './user.js'

const Music = sequelize.define('music', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    generoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genero,
            key: 'id'
        },
        allowNull: false
    },
    artistaId: {
        type: DataTypes.INTEGER,
        references: {
            model: Artista,
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
    imageId: {
        type: DataTypes.INTEGER,
        references: {
            model: Image,
            key: 'id'
        },
        allowNull: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
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
Genero.hasMany(Music, { foreignKey: 'generoId' });
Music.belongsTo(Genero, { foreignKey: 'generoId' });
Music.belongsTo(Artista, { foreignKey: 'artistaId' });
Music.belongsTo(Album, { foreignKey: 'albumId' });
Music.belongsTo(Image, { foreignKey: 'imageId' });
Music.belongsTo(User, { foreignKey: 'userId' });

export default Music;
