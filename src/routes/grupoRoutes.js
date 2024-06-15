// src/routes/grupoRoutes.js
import * as grupoController from '../controllers/grupoController.js';

export default async function grupoRoutes(fastify, options) {
    // Rota para criar um novo grupo - ok
    fastify.post('/grupo', grupoController.criarGrupo);

    // Rota para adicionar um novo membro ao grupo - ok
    fastify.post('/grupo/:grupoId/:userId', grupoController.adicionarMembro);

    // Rota para pedir para entrar num grupo - ok
    fastify.post('/grupo/pedido/:grupoId/:userId', grupoController.pedirParaEntrar);

    // Rota para aceitar o pedido de entrada de um membro - ok
    fastify.put('/grupo/:grupoId/:userId', grupoController.aceitarPedido);

    // Rota para obter todos os membros activos do grupo - ok
    fastify.get('/grupo/:grupoId', grupoController.getMembrosGrupo);

    // Rota para obter todos os pedidos de entrada num grupo - ok
    fastify.get('/grupo/:grupoId/pedidos', grupoController.getPedidos);

    // Rota para tornar um membro Owner de um grupo - ok
    fastify.put('/grupo/:grupoId/:userId/owner', grupoController.tornarOwner);

    // Rota para remover/ rejeitar um membro - ok
    fastify.delete('/grupo/:grupoId/:userId', grupoController.removerMembro);

    // Rota para eliminar um grupo
    fastify.delete('/grupo/:grupoId', grupoController.apagarGrupo);
}
