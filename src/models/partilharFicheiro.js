// models/playlist.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const PartilharFicheiro = sequelize.define('partilharFicheiro', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userOwner: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userDest: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mediaType:{
    type: DataTypes.STRING,
    allowNull: false
  },
  mediaId:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default PartilharFicheiro;
