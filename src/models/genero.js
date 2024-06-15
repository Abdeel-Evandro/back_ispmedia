// models/genero.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const Genero = sequelize.define('genero', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Genero;
