// models/playlist.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './user.js';
import Music from './music.js';

const Playlist = sequelize.define('playlist', {
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
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  }
});

// Definindo as associações
Playlist.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Playlist.belongsToMany(Music, { through: 'PlaylistMusics', as: 'musics' });

export default Playlist;
