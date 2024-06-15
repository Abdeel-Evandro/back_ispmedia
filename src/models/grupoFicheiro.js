// models/GrupoFicheiros.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Grupo from './grupo.js';

const GrupoFicheiros = sequelize.define('GrupoFicheiros', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    grupoId: {
        type: DataTypes.INTEGER,
        references:{
            model: Grupo,
            key: 'id'
        },
        allowNull: false
    },
    typeOfMedia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Relacionamentos
GrupoFicheiros.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });

export default GrupoFicheiros;
