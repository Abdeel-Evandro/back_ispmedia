import { Sequelize } from 'sequelize';

// Criação da conexão com o banco de dados
export const sequelize = new Sequelize('isp_media', 'root', '', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});

export default sequelize;