// src/routes/criticaRoutes.js
import * as criticaController from '../controllers/criticaController.js';

export default async function musicRoutes(fastify, options) {
    // Rota para criar um novo registo de uma critica
    fastify.post('/criticas/album', criticaController.adicionarCritica);

    // Rota para obter todas as criticas
    fastify.get('/criticas/album', criticaController.getAllCriticas);

    // Rota para obter uma critica pelo ID
    fastify.get('/criticas/:criticaId', criticaController.getCriticaById);

    // recuperar todas as criticas de um certo album
    fastify.get('/criticas/album/:albumId', criticaController.getAlbumCriticas);

    // Rota para atualizar uma critica pelo ID
    fastify.put('/criticas/album/:criticaId', criticaController.updateCritica);

    // Rota para apagar todas as criticas de um album
    fastify.delete('/criticas/album/:albumId', criticaController.deleteAllAlbumCriticas);

    // Rota para eliminar todas as criticas de um user
    fastify.delete('/criticas/user/:userId', criticaController.deleteAllUserCriticas);

    // Rota para eliminar uma critica de um album
    fastify.delete('/criticas/:albumId/:criticaId', criticaController.deleteCritica);
}
