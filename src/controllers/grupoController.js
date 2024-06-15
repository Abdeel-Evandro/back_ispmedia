// controllers/grupoController.js
import * as grupoServices from '../services/grupoServices.js';

// criar grupo
export async function criarGrupo(request, reply) {
    const { userOwner, nomeGrupo } = request.body;
    try {
        const grupo = await grupoServices.criarGrupo(userOwner, nomeGrupo);
        reply.status(201).send(grupo);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// adicionar um membro a um grupo
export async function adicionarMembro(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    const userId = parseInt(request.params.userId);
    try {
        const membro = await grupoServices.adicionarMembro(grupoId, userId);
        reply.status(200).send(membro);
    } catch (error) {
        reply.status(404).send({ error: error.message });
    }
}

// pedir para entrar num grupo - pendente de aceitacao
export async function pedirParaEntrar(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    const userId = parseInt(request.params.userId);
    try {
        const pedido = await grupoServices.pedirParaEntrar(grupoId, userId);
        reply.status(200).send(pedido);
    } catch (error) {
        reply.status(404).send({ error: error.message });
    }
}

// aceitar entrada de um membro no grupo
export async function aceitarPedido(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    const userId = parseInt(request.params.userId);
    try {
        const pedido = await grupoServices.aceitarPedido(grupoId, userId);
        reply.status(202).send(pedido);
    } catch (error) {
        reply.status(404).send({ error: error.message });
    }
}

// recuperar os membros activos do grupo
export async function getMembrosGrupo(request, reply){
    const grupoId = parseInt(request.params.grupoId);
    try{
        const membros = await grupoServices.getMembrosGrupo(grupoId);
        if(membros)
            reply.status(200).send(membros);
        reply.status(404).send("Grupo not founded!");
    }catch(error){
        reply.status(500).send({ error: error.message });
    }
}

// recuperar pedidos
export async function getPedidos(request, reply){
    const grupoId = request.params.grupoId;
    try{
        const membros = await grupoServices.getPedidos(grupoId);
        reply.status(200).send(membros);
    }catch(error){
        reply.status(500).send({ error: error.message });
    }
}

// remover um membro do grupo ou rejeitar o pedido de entrada
export async function removerMembro(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    const userId = parseInt(request.params.userId);
    try {
        const message = await grupoServices.removerMembro(grupoId, userId);
        reply.status(200).send(message);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// tornar um membro owner do grupo
export async function tornarOwner(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    const userId = parseInt(request.params.userId);
    try {
        const membro = await grupoServices.tornarOwner(grupoId, userId);
        reply.status(202).send(membro);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}

// apagar um grupo
export async function apagarGrupo(request, reply) {
    const grupoId = parseInt(request.params.grupoId);
    try {
        const message = await grupoServices.apagarGrupo(grupoId);
        reply.status(200).send(message);
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
}
