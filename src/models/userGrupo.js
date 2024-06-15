// models/UserGrupo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';
import Grupo from './grupo.js';
import User from './user.js';

const UserGrupo = sequelize.define('UserGrupo', {
    id: {
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
    grupoId: {
        type: DataTypes.INTEGER,
        references:{
            model: Grupo,
            key: 'id'
        },
        allowNull: false
    },
    isOwner: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isMembro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isEditor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Relacionamentos
UserGrupo.belongsTo(Grupo, { foreignKey: 'grupoId', as: 'grupo' });
UserGrupo.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default UserGrupo;
