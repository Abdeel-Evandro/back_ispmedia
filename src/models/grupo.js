// models/grupo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import User from './user.js'

const Grupo = sequelize.define('grupo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userOwner: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    nomeGrupo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Grupo.belongsTo(User, { foreignKey: 'userOwner', as: 'owner' });
export default Grupo;
